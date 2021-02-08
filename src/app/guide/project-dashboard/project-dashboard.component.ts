import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Activity } from 'src/app/models/activity-model';
import { Project } from 'src/app/models/project-model';
import { Task } from 'src/app/models/task-model';
import { GuideService } from 'src/app/services/guide.service';
import { LoginService } from 'src/app/services/login.service';
import { mileStones } from './example-data';
import { ProjectDashboardDataSource } from './project-dashboard-datasource';

/** File node data with possible child nodes. */
export interface MilestoneTreeNode {
  name: string;
  type: string;
  children?: MilestoneTreeNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}
@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements AfterViewInit, OnInit {
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  @ViewChild('TableOne', {static: true}) table: MatTable<Activity>;
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;
  dataSource: ProjectDashboardDataSource;
  displayedColumns2: string[] = ['description', 'status', 'createdOn'];
  dataSource2 = new MatTableDataSource<Task>();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','date'];
  session
  inSession:boolean = false;
  public id: number;
  project:Project;
  activities:Activity[];
  team:String[]=[];
  grouped
  progress

  ngOnInit() {
    
     //getting project id from route
     this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
     console.log(this.id);
     // Find the project that correspond with the id provided in route.
      this.project = this.guideService.projects.find(proj => proj.id === this.id);
      this.calculateProgress();
      console.log(JSON.stringify(this.project));
      //get milestones for this project
      //get all milestones for projid
    this.guideService.getMilestoneForAllUser(this.id).subscribe(data=>{
      console.log(data);
      this.grouped = groupBy(data, task => task.milestone.title);
      console.log(String(this.grouped));
    });
      //get activity milestone of the project
      this.guideService.showProject(this.id).subscribe(data=>{
        console.log(JSON.stringify(data));
        this.activities = data.activities;
        this.team = data.studentNames;
        this.dataSource = new ProjectDashboardDataSource(this.activities);
        this.dataSource.sort = this.tableOneSort;
        this.dataSource.paginator = this.tableOnePaginator;
        this.table.dataSource = this.dataSource;
      },error=>{

      })
      

    this.treeFlattener = new MatTreeFlattener(
       this.transformer,
       this.getLevel,
       this.isExpandable,
       this.getChildren);
 
     this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
     this.tdataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
     this.tdataSource.data = mileStones;
      //check if session persists
     this.session = JSON.parse(localStorage.getItem('guideSession'));
     var guideState = JSON.parse(localStorage.getItem('guide'))
     console.log('got session as '+JSON.stringify(this.session))
     if(guideState.inSession){
       if(this.session && this.id == this.session.project.id){
       this.inSession = true
       }else{
              //get guide session and store
      this.guideService.getsession(this.loginService.getGuide.id).subscribe(data=>{
        console.log('got prev session'+JSON.stringify(data))
        this.session = data
        if(this.session && this.id == this.session.project.id){
          this.inSession = true
        }
        localStorage.setItem('guideSession', JSON.stringify(data));
      },error=>{
        console.log('failed'+JSON.stringify(error))
        this.snackBar.open('Could not retrieve guide session.', 'Ok', {
          duration: 5000,
          verticalPosition: 'top', // 'top' | 'bottom'
          horizontalPosition: 'end'
          });
      });
       }
     }
     
  }

  ngAfterViewInit() {
   
  }

   /** The TreeControl controls the expand/collapse state of tree nodes.  */
   treeControl: FlatTreeControl<FlatTreeNode>;

   /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
   treeFlattener: MatTreeFlattener<MilestoneTreeNode, FlatTreeNode>;
 
   /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
   tdataSource: MatTreeFlatDataSource<MilestoneTreeNode, FlatTreeNode>;
 
   constructor(private snackBar: MatSnackBar,private activatedRoute: ActivatedRoute, private guideService: GuideService,private loginService: LoginService) {
    
   }
 
   /** Transform the data to something the tree can read. */
   transformer(node:MilestoneTreeNode, level: number) {
     return {
       name: node.name,
       type: node.type,
       level: level,
       expandable: !!node.children
     };
   }
 
   /** Get the level of the node */
   getLevel(node: FlatTreeNode) {
     return node.level;
   }
 
   /** Get whether the node is expanded or not. */
   isExpandable(node: FlatTreeNode) {
     return node.expandable;
   }
 
   /** Get whether the node has children or not. */
   hasChild(index: number, node: FlatTreeNode) {
     return node.expandable;
   }
 
   /** Get the children for the node. */
   getChildren(node: MilestoneTreeNode): MilestoneTreeNode[] | null | undefined {
     return node.children;
   }

   //onSession start clicked
   onStart(){
    this.guideService.startsession(this.id).subscribe(data=>{
      console.log('success'+JSON.stringify(data))
      this.snackBar.open("Session started.", 'Ok', {
        duration: 5000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'end'
        });
      this.session = data
      localStorage.setItem('guideSession', JSON.stringify(data));
      this.inSession = true;
    },error=>{
      console.log('failed'+JSON.stringify(error))
      this.snackBar.open('Could not start session.', 'Ok', {
        duration: 5000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'end'
        });
    });
   }
   //onSession ended
   onEnd(){
     if(this.session && this.session.session.id){
       //session undisturbed case
      this.inSession = false;
     this.guideService.endsession(this.session.session.id).subscribe(data=>{
      console.log('success'+JSON.stringify(data))
      localStorage.removeItem('guideSession')
      this.snackBar.open("Session completed.", 'Ok', {
        duration: 5000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'end'
        });
    },error=>{
      console.log('failed'+JSON.stringify(error))
      this.snackBar.open(error.error.responseMessage, 'Ok', {
        duration: 5000,
        verticalPosition: 'top', // 'top' | 'bottom'
        horizontalPosition: 'end'
        });
    });
    }else{
 
    }
   }
     
   addData(data: any){
    this.dataSource2 = new MatTableDataSource(data);
  }

  calculateProgress() {
    console.log("inside calculate project progresss" + JSON.stringify(this.project));
    var startDate = moment(this.project.startDate, "yyyy-MM-DD");
    var endDate = moment(this.project.endDate, "yyyy-MM-DD");
    var nowDate = moment();
    var daysTotal = endDate.diff(startDate, 'days');
    console.log("project progress is "+ daysTotal);
    var daysOver = nowDate.diff(startDate, 'days');
    console.log("project progress is "+ daysOver);
    this.progress = 100 - ((daysTotal-daysOver)/daysTotal * 100)
    console.log("project progress is "+ this.progress);

  }
}

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}
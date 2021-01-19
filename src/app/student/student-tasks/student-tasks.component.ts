import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { mileStones,tasks } from './example-data';
import { Task } from 'src/app/models/task-model';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task-dialog.component';

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
  selector: 'app-student-tasks',
  templateUrl: './student-tasks.component.html',
  styleUrls: ['./student-tasks.component.css']
})
export class StudentTasksComponent {
  tasksList:Task[] = [];
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<MilestoneTreeNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<MilestoneTreeNode, FlatTreeNode>;

  constructor(public dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = mileStones;
    this.tasksList = tasks;
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

  /* Check status string for input in checkbox*/
  statusCheck(status: String):boolean{
    return status=="COMPLETED"? true:false;
  }
  /* Trigger task complete */

  /* Add task open dialog*/
  openDialog(){
    console.log("inside create tasks dialog open");
    let dialogRef = this.dialog.open(CreateTaskDialogComponent); 
  }
}

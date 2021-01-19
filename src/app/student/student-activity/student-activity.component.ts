import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StudentActivityDataSource, StudentActivityItem } from './student-activity-datasource';

@Component({
  selector: 'app-student-activity',
  templateUrl: './student-activity.component.html',
  styleUrls: ['./student-activity.component.css']
})
export class StudentActivityComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StudentActivityItem>;
  dataSource: StudentActivityDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  
  getColor(num: number):String{
  const colors = ['red', 'green', 'blue', 'orange', 'yellow'];
  return '5px solid '+colors[Math.floor(num * colors.length)];
  }

  ngOnInit() {
    this.dataSource = new StudentActivityDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

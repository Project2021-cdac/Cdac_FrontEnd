import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RegisterGuideDialogComponent } from '../register-guide-dialog/register-guide-dialog.component';
import { AdminGuidesDataSource, AdminGuidesItem } from './admin-guides-datasource';

@Component({
  selector: 'app-admin-guides',
  templateUrl: './admin-guides.component.html',
  styleUrls: ['./admin-guides.component.css']
})
export class AdminGuidesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminGuidesItem>;
  dataSource: AdminGuidesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  constructor(public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(RegisterGuideDialogComponent); 
  }

  ngOnInit() {
    this.dataSource = new AdminGuidesDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}

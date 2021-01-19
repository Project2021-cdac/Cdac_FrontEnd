import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { Page404StudentComponent } from './page404-student/page404-student.component';
import { StudentNavComponent } from './student-nav/student-nav.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentActivityComponent } from './student-activity/student-activity.component';
import { StudentTasksComponent } from './student-tasks/student-tasks.component';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    StudentNavComponent,
    StudentDashboardComponent,
    StudentActivityComponent,
    StudentTasksComponent,
    CreateProjectDialogComponent,
    Page404StudentComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    StudentRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class StudentModule { }

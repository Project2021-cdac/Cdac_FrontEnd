import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';
import { AdminGuidesComponent } from './admin-guides/admin-guides.component';
import { Page404AdminComponent } from './page404-admin/page404-admin.component';
import { RegisterGuideDialogComponent } from './register-guide-dialog/register-guide-dialog.component';
import { UploadExcelDialogComponent } from './upload-excel-dialog/upload-excel-dialog.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { EditTeamSizeComponent } from './edit-team-size/edit-team-size.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminNavComponent,
    AdminStudentsComponent,
    AdminProjectsComponent,
    AdminGuidesComponent,
    Page404AdminComponent,
    UploadExcelDialogComponent,
    RegisterGuideDialogComponent,
    ProjectDashboardComponent,
    EditTeamSizeComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

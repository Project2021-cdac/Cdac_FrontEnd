import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { AdminGuidesComponent } from './admin/admin-guides/admin-guides.component';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { StudentNavComponent } from './student/student-nav/student-nav.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentActivityComponent } from './student/student-activity/student-activity.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StudentTasksComponent } from './student/student-tasks/student-tasks.component';
import { GuideDashboardComponent } from './guide/guide-dashboard/guide-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    AdminNavComponent,
    AdminStudentsComponent,
    AdminProjectsComponent,
    AdminGuidesComponent,
    StudentNavComponent,
    StudentDashboardComponent,
    StudentActivityComponent,
    StudentTasksComponent,
    GuideDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

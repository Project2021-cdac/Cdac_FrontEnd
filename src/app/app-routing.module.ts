import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentTasksComponent } from './student/student-tasks/student-tasks.component';
import { GuideDashboardComponent } from './guide/guide-dashboard/guide-dashboard.component';
import { AdminGuidesComponent } from './admin/admin-guides/admin-guides.component';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { StudentNavComponent } from './student/student-nav/student-nav.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentActivityComponent } from './student/student-activity/student-activity.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path:'admin', component: AdminDashboardComponent},
  { path:'admin/students', component: AdminStudentsComponent },
  { path:'admin/projects', component: AdminProjectsComponent },
  { path:'admin/guides', component: AdminGuidesComponent },
  { path:'student',component: StudentDashboardComponent},
  { path:'student/activity', component: StudentActivityComponent },
  { path:'student/tasks', component: StudentTasksComponent },
  { path:'guide', component: GuideDashboardComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

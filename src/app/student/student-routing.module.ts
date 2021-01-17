import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404StudentComponent } from './page404-student/page404-student.component';
import { StudentActivityComponent } from './student-activity/student-activity.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentNavComponent } from './student-nav/student-nav.component';
import { StudentTasksComponent } from './student-tasks/student-tasks.component';
import { StudentComponent } from './student.component';

const routes: Routes = [
  {
    path: '', component: StudentNavComponent, children: [
      { path:'home', component: StudentDashboardComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path:'activity', component: StudentActivityComponent },
      { path:'tasks', component: StudentTasksComponent },
      { path: '**', component: Page404StudentComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

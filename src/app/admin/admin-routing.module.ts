import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuidesComponent } from './admin-guides/admin-guides.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminProjectsComponent } from './admin-projects/admin-projects.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminComponent } from './admin.component';
import { Page404AdminComponent } from './page404-admin/page404-admin.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';

const routes: Routes = [
  {
    path: '', component: AdminNavComponent, children: [
      { path:'home', component: AdminDashboardComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path:'students', component: AdminStudentsComponent },
      { path:'projects', component: AdminProjectsComponent },
      { path:'projects/:id', component: ProjectDashboardComponent},
      { path:'guides', component: AdminGuidesComponent },
      { path: '**', component: Page404AdminComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

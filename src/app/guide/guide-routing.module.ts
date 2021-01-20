import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuideDashboardComponent } from './guide-dashboard/guide-dashboard.component';
import { GuideNavComponent } from './guide-nav/guide-nav.component';
import { GuideComponent } from './guide.component';
import { Page404GuideComponent } from './page404-guide/page404-guide.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';

const routes: Routes = [
  {
    path: '', component: GuideNavComponent, children: [
      { path:'home', component: GuideDashboardComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path:'project/:id', component: ProjectDashboardComponent},
      { path: '**', component: Page404GuideComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuideRoutingModule { }

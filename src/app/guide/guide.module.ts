import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { Page404GuideComponent } from './page404-guide/page404-guide.component';
import { GuideDashboardComponent } from './guide-dashboard/guide-dashboard.component';
import { GuideNavComponent } from './guide-nav/guide-nav.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ChooseProjectDialogComponent } from './choose-project-dialog/choose-project-dialog.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ChangePswdComponent } from './change-pswd/change-pswd.component';


@NgModule({
  declarations: [
    GuideNavComponent,
    GuideDashboardComponent,
    Page404GuideComponent,
    ChooseProjectDialogComponent,
    ProjectDashboardComponent,
    ChangePswdComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    GuideRoutingModule
  ]
})
export class GuideModule { }

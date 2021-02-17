import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuardService } from './services/auth-guard.service';



const routes: Routes = [
  { path:'', redirectTo:'login',pathMatch: 'full' },
  { path:'login', component: LoginComponent },
  { path: 'admin', loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule) },
  { path: 'student', loadChildren: () => import(`./student/student.module`).then(m => m.StudentModule) },
  { path: 'guide', loadChildren: () => import(`./guide/guide.module`).then(m => m.GuideModule) },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

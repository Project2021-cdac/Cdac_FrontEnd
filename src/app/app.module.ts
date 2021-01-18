import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './student/student.component';
import { GuideComponent } from './guide/guide.component';
import { ErrorComponent } from './error/error.component';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { GuideModule } from './guide/guide.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
//import {SelectAutocompleteModule} from 'mat-select-autocomplete-angular9';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    AdminComponent,
    StudentComponent,
    GuideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AdminModule,
    StudentModule,
    GuideModule,
    LayoutModule
//    SelectAutocompleteModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

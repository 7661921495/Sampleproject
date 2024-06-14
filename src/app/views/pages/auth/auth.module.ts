// Version 1.0 
// project name : MVNOC ACP RESELLER PLATFORM
// filename : auth.module.ts
// path :src\app\views\pages\auth\
// purpose: routing functions related to auth folder
// author: apoorva
// version history: v1.0 initial version
// 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'; 
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'change-password',
        component:ChangePasswordComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
    ]
  },
]

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ChangePasswordComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule
  ]
})
export class AuthModule { }

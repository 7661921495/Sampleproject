import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/components/components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ServicesComponent } from '../services/services.component';
import { ContactComponent } from '../contact/contact.component';

const routes:Routes=[
  {path:'',component:AdminDashboardComponent,

  children:[
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'services',component:ServicesComponent},
    {path:'contact',component:ContactComponent},
    {path:'',redirectTo:'../modules/home',pathMatch:'full'},

  ]},
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class AdminRoutingModule { }

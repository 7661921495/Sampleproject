// Version 1.0 
// project name : PE MVNOC Admin Platform
// filename : :app.routing.module.ts
// path :src\app\
// purpose: functions related routing
// author: apoorva
// version history: v1.0 initial version
// 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';




const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
     
      
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./views/pages/sims/sims.module').then(m => m.SimsModule)
      },
     
      

      {
        path: 'customer',
        loadChildren: () => import('./views/pages/pe-customer/pe-customer.module').then(m => m.PeCustomerModule)
      },

      {
        path: 'user-management',
        loadChildren: () => import('./views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'apis',
        loadChildren: () => import('./views/pages/partner-api-logs/partner-api-logs.module').then(m => m.PartnerApiLogsModule)
      },
     
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, 
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  
 
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

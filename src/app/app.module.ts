// Version 1.0 
// project name : MVNOC ACP RESELLER PLATFORM
// filename : :app.routing.module.ts
// path :src\app\
// purpose: packages related to run  application
// author: apoorva
// version history: v1.0 initial version
// 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth-interceptor';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//  import { PendingApprovalComponent } from './views/pages/pending-approval/pending-approval.component';
// import { SimsComponent } from './views/pages/sims/sims.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
// import { SpinnerComponent } from './views/pages/spinner/spinner.component';
import { OrdersManagementComponent } from './views/pages/orders-management/orders-management.component';
import { PeCustomerComponent } from './views/pages/pe-customer/pe-customer.component';
// import { PartnerApiLogsComponent } from './views/pages/partner-api-logs/partner-api-logs.component';
// import { UserManagementComponent } from './views/pages/user-management/user-management.component';

// import { WeeklyCommissionsComponent } from './views/pages/weekly-commissions/weekly-commissions.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    OrdersManagementComponent,
    // PartnerApiLogsComponent,
   
    // PeCustomerComponent,
 
   
   
        // WeeklyCommissionsComponent
  
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    NgbModule,
    NgApexchartsModule,
    // NgxPaginationModule,
    // NgxSpinnerModule
    NgbToastModule,
    NgxDatatableModule,
    BrowserModule,
    NgbToastModule
    // ToastrModule.forRoot({
    //   positionClass: 'toast-top-right'
    // })
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

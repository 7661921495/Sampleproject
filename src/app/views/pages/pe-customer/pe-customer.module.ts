import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PeCustomerComponent } from './pe-customer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ActivationRequestComponent } from './activation-request/activation-request.component';
import { DataTable } from 'simple-datatables';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PurchaseOrderDetailsComponent } from './purchase-order-details/purchase-order-details.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

// import { DatePipe } from '@angular/common';
const routes: Routes = [
  {
    path: 'lookup',
    component: PeCustomerComponent
  },
  {
    path: 'activation-request',
    component: ActivationRequestComponent
  },
]

@NgModule({
  declarations: [PeCustomerComponent, ActivationRequestComponent, PurchaseOrderDetailsComponent],
  imports: [
    NgbCollapseModule, NgxDatatableModule,CommonModule,NgbPaginationModule ,NgbDatepickerModule,NgbTooltipModule,FormsModule,ReactiveFormsModule, RouterModule.forChild(routes),FeatherIconModule 
  ],
  exports:[
  
    // PeCustomerComponent
  ],
  providers:[DatePipe]
 
})
export class PeCustomerModule { }

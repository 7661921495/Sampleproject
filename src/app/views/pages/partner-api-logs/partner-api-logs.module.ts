import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrierLogsComponent } from './carrier-logs/carrier-logs.component';
import { PartnerApiLogsComponent } from './partner-api-logs.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'partner-apis',
    component: PartnerApiLogsComponent
  },
  {
    path: 'carrier-apis',
    component: CarrierLogsComponent
  },
]
@NgModule({
  declarations: [
    CarrierLogsComponent,PartnerApiLogsComponent
  ],
  imports: [
    CommonModule,NgxDatatableModule,RouterModule.forChild(routes),NgbToastModule,NgbTooltipModule,FormsModule, ReactiveFormsModule, NgbDropdownModule, NgbDatepickerModule
  ],
  providers: [DatePipe],
})
export class PartnerApiLogsModule { }

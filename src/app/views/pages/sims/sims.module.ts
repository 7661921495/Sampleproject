import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbTooltipModule, NgbNavModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
// import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SimsComponent } from './sims.component';
// import {file}
import { PhoneInventoryComponent } from './phone-inventory/phone-inventory.component';
// import { WeeklyCommissionsComponent } from './weekly-commissions/weekly-commissions.component';
// import { SimOrderComponent } from './sim-order/sim-order.component';
// import { SimInventoryComponent } from './sim-inventory/sim-inventory.component';
// import { ComingSoonComponent } from './coming-soon/coming-soon.component';
// import { BundlePurchaseComponent } from './bundle-purchase/bundle-purchase.component';
// import { BundleRateplanComponent } from './bundle-rateplan/bundle-rateplan.component';
// import { BundleAddonplanComponent } from './bundle-addonplan/bundle-addonplan.component';
// import { SimAssignmentComponent } from './sim-assignment/sim-assignment.component';
// import { SimLocationsComponent } from './sim-locations/sim-locations.component';
// import { AddSimLocationsComponent } from './sim-locations/add-sim-locations/add-sim-locations.component';
// import { NgxSpinnerModule } from "ngx-spinner";
// import { DatePipe } from '@angular/common';
// import { WeeklyCommissionsComponent } from './weekly-commissions/weekly-commissions.component';
import { UploadAsnComponent } from './upload-asn/upload-asn.component';
import { UploadAsnDeviceComponent } from './upload-asn-device/upload-asn-device.component';

import { EsimActivationCodesComponent } from './esim-activation-codes/esim-activation-codes.component';
import { EsimQrcodeGenerationComponent } from './esim-qrcode-generation/esim-qrcode-generation.component';

const routes: Routes = [
  {
    path: 'sim-inventory',
    component: SimsComponent
  },
  {
    path: 'phone-inventory',
    component: PhoneInventoryComponent
  },
  {
    path: 'upload-sims-asn',
    component: UploadAsnComponent
  },

  {
    path: 'upload-device-asn',
    component: UploadAsnDeviceComponent
  },
 
  // {
  //   path: 'weekly-commission',
  //   component: WeeklyCommissionsComponent
  // },
  {
    path: 'esim-activationcodes',
    component: EsimActivationCodesComponent
  },
  {
    path: 'esim-activationcodes',
    component: EsimActivationCodesComponent
  },

  {
    path: 'esim-QRcode',
    component: EsimQrcodeGenerationComponent
  },
]

@NgModule({
  declarations: [SimsComponent,PhoneInventoryComponent,  UploadAsnComponent, UploadAsnDeviceComponent, EsimActivationCodesComponent, EsimQrcodeGenerationComponent,  ],
  providers: [DatePipe],
  imports: [
    CommonModule,FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    NgbCollapseModule,
    ArchwizardModule,
    NgxDatatableModule,
    NgbDatepickerModule, NgSelectModule,]
    
})
export class SimsModule { }

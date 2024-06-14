import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { ClipboardModule } from 'ngx-clipboard';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TablesModule } from '../tables/tables.module';

import { UserManagementComponent } from './user-management.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AddUserRoleComponent } from './user-role/add-user-role/add-user-role.component';
import { PartnerComponent } from './partner/partner.component';
import { AddPartnerComponent } from './partner/add-partner/add-partner.component';

import { DatePipe } from '@angular/common';
import { NgbDropdownModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
const routes: Routes = [
  {
    path: 'user',
    component: UserManagementComponent
  },
  {
    path: 'role',
    component: UserRoleComponent
  },
  {
    path: 'partner',
    component: PartnerComponent
  },
]
@NgModule({
  declarations: [
    AddUserComponent,
    UserProfileComponent,
    UserManagementComponent,
    UserRoleComponent,
    AddUserRoleComponent,
    PartnerComponent,
    AddPartnerComponent
  ],
  imports: [
    NgxDatatableModule, CommonModule,RouterModule.forChild(routes), ReactiveFormsModule,FormsModule,ClipboardModule, NgxMaskModule.forRoot(maskConfig),NgbToastModule,NgbTooltipModule
  ]
})
export class UserManagementModule { }

// Version 1.0 
// project name : MVNOC PE PLATFORM
// filename : user-management.component.ts
// path :src\app\views\pages\user-management
// purpose: functions related to users 
// author: apoorva
// version history: v1.0 initial version
// 

import { Component, OnInit, EventEmitter, Input, OnChanges, Output, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PlatformUser } from 'src/app/core/models/platformuser-model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from 'src/app/utils/utils.service';
import { PlatformUserService } from 'src/app/core/services/platformuser-service';
import { ApiResponse } from 'src/app/core/models/api-response';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @Output() editNewUserEvent = new EventEmitter();
  showProviderWindow = false;
  editProviderWindow = false;

  submitted: any
  currentPage = 4;
  temp = [];
  rows: any [] =[];
  userData = [];
  columns = [];
  user_master: any []=[];
  @Input() user: '';
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  usersubmitted:boolean=false
  purpose: any;
  userForm: any;
  user_model:PlatformUser={
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    role: 0,
    userName: '',
    masterId: 0,
    subMasterId: 0,
    fieldManagerId: 0,
    fusionId:0,
    isFirstTimeLogin: true,
    activeStatus: false
  };
  errors: any[];
  menuitems_master : any[];
  menuitems : any;
  noAccessToPage :boolean = false;
  isLoading = false
  show_all: boolean = false;
  show_active: boolean = false;
  show_inactive: boolean = false;
  
  
  userDetails: any;
  locationDetail: any;
  entityID: number;
  parentID: number;
  partnerEntityID: number;
  loggedUser: any;
  locationIds:any []=[];
  platformUser : PlatformUser={
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    role: 0,
    userName: '',
    masterId: 0,
    subMasterId: 0,
    fieldManagerId: 0,
    fusionId:0,
    isFirstTimeLogin: true,
    activeStatus: false
  };
  userId: any;
  pwd_Data: any;
  userRoleId: any;
  statusType: string;
  showDistributorWindow: boolean;
  agentroleName: any;
  roleid: any;
  subagentdetails: any;
  modalRef: NgbModalRef;
  selectedRow: any;
  modalShouldOpen: boolean = false;
  isModalOpen: any;
  constructor(private router: Router,private route: ActivatedRoute,private cd: ChangeDetectorRef,public util: UtilsService, private modalService: NgbModal,public platformuserservice : PlatformUserService,) {
    this.roleid =localStorage.getItem('RoleId') 

    console.log(this.roleid)
   }


   public onFormGroupChangeEvent(_event: any) {
    this.userForm = _event

   }
  ngOnInit(): void {

    this.show_active=true; 

    this.platformUser={
     id: 0,
     firstName: '',
     lastName: '',
     email: '',
     phoneNo: '',
     role: 0,
     userName: '',
     masterId: 0,
     subMasterId: 0,
     fieldManagerId: 0,
     fusionId:0,
     isFirstTimeLogin: true,
     activeStatus: false
   };
  }

  hideProviderWindow() {
    // this.resetPlatformuser();
     this.showProviderWindow = false;
   }
 
  
   inituserManager(){
     this.platformUser={
       id: 0,
       firstName: '',
       lastName: '',
       email: '',
       phoneNo: '',
       role: 0,
       userName: '',
       masterId: 0,
       subMasterId: 0,
       fieldManagerId: 0,
       fusionId:0,
       isFirstTimeLogin: true,
       activeStatus: false
     };
 this.rows=[]
    //  this.getEntities(2,2)
     this.agentroleName =''
    
   }
   showall(event:any){
    // console.log(event.target.id)
if(event.target.id == 'btnradio1' ){
  this.rows = this.user_master
}
if(event.target.id == 'btnradio2' ){
this.showactive()
}
if(event.target.id == 'btnradio3' ){
this.showinactive()


}
 
  }
  showactive(){
   
this.rows=[]

      for (var value of this.user_master){
        if(value.activeStatus == true){
          this.rows.push(value);
       
        }
   
  }
    // whenever the filter changes, always go back to the first page
    //this.mytable.offset = 0;
  
   }
  
   showinactive()
   {
    
this.rows=[]
   
      for (var value of this.user_master){
        if(value.activeStatus == false){
          this.rows.push(value);
         
        }
    
  }
   
    // assign filtered matches to the active datatable
    // this.rows = this.user_master.filter(function(item:any){
    //   // iterate through each row's column data
     
    //   for (let i=0; i<colsAmt; i++){
    //     // check for a match
    //   if(item[keys[i]] != null)
    //   {
    //     if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
    //       // found match, return true to add to result set
    //       return true;
    //     }
    //   }
       
    //   }
    // });
    // whenever the filter changes, always go back to the first page
    //this.mytable.offset = 0;
  
   }
  edit(event:any) {
    console.log(event)
    
     this.platformUser = event;
     this.agentroleName = event.roleName
     this.roleid = event.roleId
       this.showProviderWindow =true;
    };
   onCellClick(content: any, row: any) {
    const selectedRow = content.row; // Assuming you only allow selecting one row
    if (selectedRow) {
      this.modalRef = this.modalService.open(row, {
        backdrop: 'static',
        size: 'md',
        keyboard: false,
        centered: true,
      });
    }
  }
  onRowClick(event: any, ) {

    this.isModalOpen = true
    this.selectedRow = event
   
  }

  

  openModal(content: any, selectedRow: any) {
    // Open the modal and set the flag
    this.modalRef = this.modalService.open(content, {
      backdrop: 'static',
      size: 'md',
      keyboard: false,
      centered: true,
    });

     this.isModalOpen = true;

    // Handle modal close event
    this.modalRef.result.then(
      (result) => {
        // console.log('Modal closed', result);
        this.isModalOpen = false;
      },
      (reason) => {
        // console.log('Modal dismissed', reason);
        this.isModalOpen = false;
      }
    );
  }

  closeModal() {
    // Close the modal and reset the flag
    if (this.modalRef) {
      this.modalRef.close();
      this.isModalOpen = false;
    }
  }
  saveNewUser(evnt: any,result: any){
   
// this.rows = this.userForm.value
  }

  pwdModal(content:any) {
    
    this.isLoading=true
   if (this.platformUser.id == 0){
  
    this.modalService.open(content, { backdrop: 'static',size: 'md', keyboard: false,centered: true },).result.then((result) => {
      //  console.log("Modal closed" + result);
    }).catch((res) => { });
  }
this.isLoading=false
  }

  getPlatformUsers() {
    // this.spinner.show();
    this.isLoading = true
    // this.platformuserservice.getAllUsersByRoleId(2).subscribe((PU: ApiResponse<any>) => {
    // // console.log(PU.data)
    //   setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     // this.spinner.hide();
    //   }, 3000);
    //   this.rows = PU.data;
    //  this.user_master = PU.data;
     
    //  this.isLoading = false
    // }, (error:any) => {
    //   Swal.fire({
    //     title: 'Error',
    //     text: error.error.Message,
    //     toast: true, position: 'top-end', 
    //     showConfirmButton: true,

    //     // icon: 'error', // Set the error icon
    //     confirmButtonColor: '#dc3545', // Set the error color
    //   });
    //   // console.log(error.err.message);
    //   // this.spinner.hide();
    // })
  }

  filterUserData(event:any){
    // this.filterDataAPI = this.apihistory_master;
     // get the value of the key pressed and make it lowercase
     let val = event.target.value.toLowerCase();
     // get the amount of columns in the table
    // let colsAmt = this.apihistory.length;
     // get the key names of each column in the dataset
     let keys = Object.keys(this.user_master[0]);
     let colsAmt = keys.length;
     // assign filtered matches to the active datatable
     this.rows = this.user_master.filter(function(item: any){
       // iterate through each row's column data
      
       for (let i=0; i<colsAmt; i++){
         // check for a match
       if(item[keys[i]] != null)
       {
         if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val){
           // found match, return true to add to result set
           return true;
         }
       }
        
       }
       return false; 
     }); 
      
     // whenever the filter changes, always go back to the first page
     //this.mytable.offset = 0;
   }

}

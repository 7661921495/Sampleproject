// Version 1.0 
// project name : MVNOC ADMIN  PORTAL
// filename : add-partner.component.ts
// path :src\app\views\pages\user-managemnt\partner\add-partner
// purpose: functions related to  add partner 
// author: apoorva
// version history: v1.0 initial version
// 


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import Swal from 'sweetalert2';

 import { ApiResponse } from 'src/app/core/models/api-response';
 import { UtilsService } from 'src/app/utils/utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {

  partnerForm: FormGroup;
  submitted = false;
  showProviderWindow = false;
  rolesData : any;
  selectedrole : any;
  @Output() addNewpartnerEvent = new EventEmitter();
 
  @Output() cancelEvent = new EventEmitter();
  constructor(private formBuilder: FormBuilder, private router: Router,private modalService: NgbModal,public util: UtilsService,) { }

  ngOnInit(): void {
    this.partnerForm = this.formBuilder.group({
      partnerName: ['',[Validators.required,Validators.maxLength(10),this.removeSpaces]],
      planCode: ['',Validators.required,this.removeSpaces ],
      DBA: ['',Validators.required,this.removeSpaces ],
      userName:['', [Validators.required]],
      contactName: ['', ],
      contactTitle:['', ],
      contactEmail:['', ],
      contactphoneNo:['', ],
      address1:[, [Validators.required]],
      address2: [0,],
      city: [0,],
      state: [0,],
      zip:[''  , Validators.required] 
      
     
  
     
      
      
  });
  }


  removeSpaces(c: FormControl) {
    if (c && c.value) {
      let removedSpaces = c.value.trimStart();
      c.value !== removedSpaces && c.setValue(removedSpaces);
    }
    return null;
  }



  get f() { return this.partnerForm.controls }


  saveNewUser() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.partnerForm.invalid) {
      return;
    }
    // console.log(this.selectedLocation)
    this.addNewpartnerEvent.emit(this.partnerForm.value);
    // this.addNewLocEvent.emit(this.userForm.value.locationId)


  }


  cancel() {
    // this.cancelEvent.emit();
      this.cancelEvent.emit();
   
  }
  selectedStatusValue(value:any){
    //  console.log(value.target.value)
    
  }
  reset(){
     this.submitted = false;
 this.partnerForm.reset();
  }

}

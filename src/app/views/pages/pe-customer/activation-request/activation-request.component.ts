import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ApiResponse } from 'src/app/core/models/api-response';
import { PartnerService } from 'src/app/core/services/partner.service';
import { NexusService } from 'src/app/core/services/nexus.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-activation-request',
  templateUrl: './activation-request.component.html',
  styleUrls: ['./activation-request.component.scss']
})
export class ActivationRequestComponent implements OnInit {
showActivation:boolean =false
  show_data :any;
  isLoading: boolean;
  mvnomainPlans:any;
  mvnopartnerBillingCode:any;
  customerForm:FormGroup;
  e911Form:FormGroup;
  submitted: boolean = false;
  mvnoPlanDetails: any;
  selectedPlanCode: string;
  showPlanDetails: boolean;
  showe911: boolean =false;
  displayMSISDN: any;
  partnerTransactionId: any;
  constructor(private router: Router,private partnerService:PartnerService , private nexusService:NexusService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.customerForm = this.formBuilder.group({
      iccid:['',Validators.required],
      planCode: ['',Validators.required],
      billingCode: ['', Validators.required],
      zip:['', Validators.required]
    });

    this.e911Form = this.formBuilder.group({
      street1: ['',],
      street2: ['',],
      city: ['',],
      state:['',],
      zip:['']
    });
    this.MVNOmainPlans()
    this.MVNOPartnerWPS()
  }


  get f() { return this.customerForm.controls }
  activateSubscriber(){
    this.submitted = true;
    
    
    if (this.customerForm.invalid) {
      // this.spinner.hide()
      return;

    }
    this.isLoading = true
    // console.log(this.customerForm.value.iccid,this.customerForm.value.planCode,this.customerForm.value.billingCode,this.customerForm.value.zip,this.e911Form.value)
    this.nexusService.activateSim(this.customerForm.value.iccid,this.customerForm.value.planCode,this.customerForm.value.billingCode,this.customerForm.value.zip,this.e911Form.value).subscribe((res: any) => {
     

      this.displayMSISDN = res.result.msisdn
      this.partnerTransactionId = res.resultCode.partnerTransactionId
        //  this.mvnomainPlans = res.result
        Swal.fire({
          title: 'Activation completed successfully',
           text: res.resultCode.partnerTransactionId ,
          toast: true, position: 'top-end', 
          showConfirmButton: true,
         // icon: 'error', // Set the error icon
          confirmButtonColor: '#dc3545', // Set the error color
        });
       this.submitted = false
          this.isLoading =false
          this.showPlanDetails =false
          this.MVNOmainPlans()
          this.MVNOPartnerWPS()
          this.customerForm.reset()
          this.e911Form.reset()
          this.showActivation =true
         },
          (error:any) => {
            console.log(error);

            this.isLoading =false
           // this.spinner.hide();
         })

  }
  
  gotoCustomerLookup(){
     this.show_data = true
    this.router.navigate(['/customer/lookup'],{state:{data:this.show_data}})
  }

  close(){
    this.showActivation =false
    this.showPlanDetails =false
    this.showe911 =false
    this.submitted=false
    this.customerForm.reset()
    this.e911Form.reset()
  }

  selectedChangePlanCode(event:any)
{
  
console.log(this.selectedPlanCode )
this.showPlanDetails =true
this.MVNOPlanDetails()
} 
  MVNOmainPlans(){
    this.partnerService.GetMVNOmainPlans().subscribe((res: any) => {
      this.isLoading = true

      // console.log(res.result)
         this.mvnomainPlans = res.result
          
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
           // this.spinner.hide();
         })
  }

  MVNOPartnerWPS(){
    this.partnerService.GetMVNOPartnerWPS().subscribe((res: any) => {
      this.isLoading = true

      // console.log(res.result)
         this.mvnopartnerBillingCode = res.result
          
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
           // this.spinner.hide();
         })

  }

  
  MVNOPlanDetails(){
    this.partnerService.GetMVNOPlanDetails(this.selectedPlanCode).subscribe((res: any) => {
      this.isLoading = true
    //  this.showPlanDetails = true
      // console.log(res.result.planCommonSOCs)
         this.mvnoPlanDetails = res.result

         this.mvnoPlanDetails.planCommonSOCs.forEach((plan: { productName: string; }) => {
          if (plan.productName === 'WFC') {
            this.showe911 = true;
          }
          else 
          {
            this.showe911 =false
          }
        });
      
         
          
          console.log(this.mvnoPlanDetails.planCommonSOCs)
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
           // this.spinner.hide();
         })
  }


}

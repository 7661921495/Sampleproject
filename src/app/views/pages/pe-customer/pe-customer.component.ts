import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {  Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ApiResponse } from 'src/app/core/models/api-response';
import { PartnerService } from 'src/app/core/services/partner.service';
import { DataTable } from 'simple-datatables';
import { DatePipe, formatDate } from '@angular/common'
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NexusService } from 'src/app/core/services/nexus.service';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pe-customer',
  templateUrl: './pe-customer.component.html',
  styleUrls: ['./pe-customer.component.scss']
})
export class PeCustomerComponent implements OnInit {
  dataTable: DataTable | undefined;
  entriesOptions: number[] = [5, 10, 15, 20];  // Add more options as needed
  providers: [DatePipe]
  searchForm:FormGroup
  deviceForm: FormGroup
  purchasePlanForm:FormGroup
  changePlanForm:FormGroup
  showResults = false;
  submitted = false;
  showCarrier: boolean =false;
  ShowOrderHistory: boolean = false;
  showBalanceInfo: boolean;
  showCustomerInfo: boolean;
  showQueryDevice:boolean;
  showlivelookup:boolean;
  showpurchaseplan:boolean;
  showchangeplan:boolean
  showpurchaseordershistory:boolean
  @Input() show_data:any;
  rows =[]
  loadingIndicator = true;
  optionalSizesModalCode: any;
  reorderable = true;
  ColumnMode = ColumnMode;
  isLoading = false
  subcriberDetails: any;
  PurchaseOrdersummary: any;
  PurchaseOrders: any;
  ordersHistory: any []=[];
  purchaseId: number;
  purchaseOrderDetailsById: any;
  isvoiceCollapsed:boolean
  issmsCollapsed:boolean
  isdataCollapsed:boolean
  isthresholdCollapsed:boolean
  showPlanDetails:boolean =false
  // show_voice_tier:boolean =false
  VoiceTiers: any[]=[];
  SMSTiers: any;
  DataTiers: any;
  mvnomainPlans: any;
  mvnotopupPlans: any;
  hlrs: any;
  Usage: any;
  selectedPlanCode: string;
  mvnoPlanDetails: any;
  OrderDetailsById: any []=[];
  orderHistoryTemp: any []=[];
  purchaseOrdersTemp: any;
  // apiData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedData: any[] = [];
  newOrderDetails: any;
  temp: any;
  totalItems: any;
  thresholds: any;
  asynclogs: any[]=[]
  asyncForm:FormGroup
  fromDate: NgbDate ;
  toDate: NgbDate ;
  showpartnerasynclogs: boolean;
  xmlRequest: any;
  xmlResponse: any;
  constructor(private formBuilder: FormBuilder, @Inject(DOCUMENT) private document: Document, private partnerService:PartnerService,private datePipe: DatePipe,private modalService: NgbModal,private nexusservice:NexusService ) {
   
   }





  ngOnInit(): void {
    // const dataTable = new DataTable("#dataTableExample");
    this.searchForm = this.formBuilder.group({
      msisdn: ['',],
      iccid: ['',],
      subscriberId: [0,],
    });

    this.deviceForm = this.formBuilder.group({
      imei: ['',[Validators.required,this.removeSpaces,Validators.pattern("^[0-9]*$")]],
    })
    this.changePlanForm = this.formBuilder.group({
      planCode: ['',Validators.required],
    })
    this.purchasePlanForm = this.formBuilder.group({
      planCode: ['', Validators.required],
    })
    this.asyncForm = this.formBuilder.group({
      // customer_name: ['', Validators.required],
      fromDate:  ['', Validators.required],
      toDate:  ['', Validators.required],
      asynctype:['',Validators.required]
      // choice :['',Validators.required],
      
     });

     const now = new Date(); 
     this.asyncForm?.get('fromDate')?.setValue({year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()-1})
     this.asyncForm?.get('toDate')?.setValue({year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()})

   console.log( this.changePlanForm.value.planCode)
    this.show_data = history.state.data;
    console.log(this.show_data)
    if (this.show_data != undefined ) {
    this.invokeSearch(this.show_data)
    }

    // console.log( localStorage.getItem('access_token'))
    // if(this.show_data == undefined){
    //   this.invokeCancel()
    // }
    // else{
    //   this.invokeCancel() 
    // }
    //  this.showCarrier = false
  }
  checkValid(): boolean {
    const controls = [ 'msisdn', 'iccid','planCode'];
    return !controls.some(control => {
      const formControl = this.searchForm.get(control) || this.purchasePlanForm.get(control);
      return formControl && formControl.value && formControl.value.trim().length > 0;
    });
  }
  initializeDataTable(): void {
    if (this.dataTable) {
      this.dataTable.destroy();  // Destroy existing instance if it exists
    }
    this.dataTable = new DataTable('#dataTable', {
      searchable: true,
      fixedHeight: true,
      perPage: this.entriesOptions[1]  // Default perPage value
    });
  }

  updateEntriesPerPage(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const perPage = parseInt(selectedValue, 10);
    if (this.dataTable) {
      // this.dataTable.({
        perPage: perPage
      // });
    }
  }

  get f() { return this.searchForm.controls }
  get cf() { return this.changePlanForm.controls }

  get pf()  {
    return this.purchasePlanForm.controls
  }
  removeSpaces(c: FormControl) {
    if (c && c.value) {
      let removedSpaces = c.value.split(' ').join('');
      c.value !== removedSpaces && c.setValue(removedSpaces);
    }
    return null;
  }
  onreset(){

  }
  searchData(){

  }
  formatData(orderStatus: any[]): string {
    if (!Array.isArray(orderStatus)) {
      return '';
    }
    return orderStatus.map(status => 
      Object.entries(status).map(([key, value]) => `${key}: ${value}`)
.join(', ')).join(' | ');
}

  invokeSearch(e:any){
    // console.log(this.searchForm.get('msisdn')?.value);
    // this.submitted = true;
    if (this.checkValid() === false) {
      // Handle the form submission
      console.log('Form Submitted', this.searchForm.value);
    } else {
      console.error('Form is invalid');
    }
    this.showCustomerInformation()
    
    this.showCarrier = false

  this.submitted=false
    this.showBalanceInfo = false
    this.ShowOrderHistory = false
    this.showQueryDevice=false
    this.showlivelookup=false
    this.showpurchaseplan=false
    this.showchangeplan =false
    this.showpurchaseordershistory =false
    this.showpartnerasynclogs=false
    
    this.showResults=true;
  }

  invokeCancel(){
    
    this.searchForm.reset()
    this.showResults=false;
    this.showCarrier =false
    this.submitted=false
    this.ShowOrderHistory = false
    this.showBalanceInfo = false
    this.showCustomerInfo = false
    this.showQueryDevice =false
    this.showlivelookup=false
    this.showpurchaseplan=false
    this.showchangeplan =false
    this.showpurchaseordershistory =false
    this.showpartnerasynclogs=false
   this.purchasePlanForm.reset()
   this.changePlanForm.reset()
   this.asyncForm.reset()
   this.showPlanDetails=false
  }
  
  showcdr(){

  }

  ondropdownChange(event:any){

  }

  showOrderhistory(){
    this.OrderhistorySummary()
  this.ShowOrderHistory = true  
  this.showResults = true
  this.showBalanceInfo = false
  this.showCustomerInfo =false
  this.showQueryDevice=false
  this.showlivelookup=false
  this.showpurchaseplan=false
  this.showchangeplan =false
  this.showpartnerasynclogs=false
  this.showpurchaseordershistory =false
  this.showPlanDetails=false
  }

  showBalanceInformation(){
    this.ShowOrderHistory = false 
    this.showResults = true
    this.queryUsage()
    this.showBalanceInfo = true
    this.showCustomerInfo =false
    this.showQueryDevice=false
    this.showlivelookup=false
    this.showpurchaseplan=false
    this.showchangeplan =false
    this.showpurchaseordershistory =false
    this.showpartnerasynclogs=false
    this.showPlanDetails=false
    }

    
    showCustomerInformation(){

      this.ShowOrderHistory = false 
      
      this.showBalanceInfo = false
      this.showpartnerasynclogs=false
      this.showQueryDevice=false
      this.showlivelookup=false
      this.showpurchaseplan=false
      this.showchangeplan =false
      this.showpurchaseordershistory =false
      this.subcriberInfo()
      this.showCustomerInfo =true
      this.showResults = true
      this.showPlanDetails=false
    }
    showCarrierInfo(){
      this.ShowOrderHistory = false 
      this.showResults = true 
      this.showBalanceInfo = false
      this.showCustomerInfo =false
      this.showQueryDevice=false
      this.showpartnerasynclogs=false
      this.queryHLR()
      
      this.showPlanDetails=false
      this.showlivelookup=true
      this.showpurchaseplan=false
      this.showchangeplan =false
      this.showpurchaseordershistory =false
    }
  queryDevice(){
    this.ShowOrderHistory = false 
    this.showResults = true
    this.showBalanceInfo = false
    this.showCustomerInfo =false
    this.deviceForm.get('imei')?.setValue(this.subcriberDetails.imei);
    this.showQueryDevice=true
    this.showlivelookup=false
    this.showpurchaseplan=false
    this.showchangeplan =false
    this.showpartnerasynclogs=false
    this.showpurchaseordershistory =false
    this.showPlanDetails=false
  }

  purchasePlan(){
    this.ShowOrderHistory = false 
    this.showResults = true
    this.showBalanceInfo = false
    this.showCustomerInfo =false
    this.showQueryDevice=false
    this.showlivelookup=false
    this.showpartnerasynclogs=false
    this.MVNOtopupPlans()
    this.showpurchaseplan=true
    this.showchangeplan =false
    this.showPlanDetails=false
    this.showpurchaseordershistory =false
  }

  changePlan(){
    this.ShowOrderHistory = false 
    this.showResults = true
    this.showBalanceInfo = false
    this.showCustomerInfo =false
    this.showQueryDevice=false
    this.showlivelookup=false
    this.showpurchaseplan=false
    this.showpartnerasynclogs=false
    this.MVNOmainPlans()
    this.showPlanDetails=false
    this.showchangeplan =true
    this.showpurchaseordershistory =false
  }
  purchaseOrders(){
    this.ShowOrderHistory = false 
    this.showResults = true
    this.showBalanceInfo = false
    this.showCustomerInfo =false
    this.showQueryDevice=false
    this.showlivelookup=false
    this.showpurchaseplan=false
    this.showchangeplan =false
    this.showpartnerasynclogs=false
    this.showPlanDetails=false
    this.purchaseOrderSummary()
    this.showpurchaseordershistory =true

  }

  partnerAsyncLogs(){
    this.ShowOrderHistory = false 
    this.showResults = true
    this.showBalanceInfo = false
    this.showCustomerInfo =false
    this.showQueryDevice=false
    this.showlivelookup=false
    this.showpurchaseplan=false
    this.showchangeplan =false
    this.showpurchaseordershistory =false
    this.showPlanDetails=false
    this.getpartnerAysncLogs()
    this.showpartnerasynclogs=true

  }

  subcriberInfo(){

    this.isLoading = true
    this.partnerService.GetSubcriberInfo(this.searchForm.value.msisdn,this.searchForm.value.iccid,this.searchForm.value.subscriberId).subscribe((res: any) => {
   
     this.subcriberDetails = res.result
    
       
       this.isLoading =false
  
      }, (error) => {
         console.log(error);
         this.isLoading =false
        // this.spinner.hide();
      })
  }

  purchaseOrderSummary(){
    this.isLoading = true
  this.temp=[]
    this.partnerService.GetPurchaseOrdersSummary(this.subcriberDetails?.subscriberId).subscribe((res: any) => {
     
        this.PurchaseOrders = res.result
        this.temp=this.PurchaseOrders
        this.purchaseOrdersTemp = this.PurchaseOrders
        
          this.updatePagination()
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
            this.isLoading =false
           // this.spinner.hide();
         }) 
  }

  OrderhistorySummary(){
    this.isLoading = true
   this.temp=[]
    this.partnerService.GetOrdersSummary(this.subcriberDetails?.subscriberId).subscribe((res: any) => {
     
      console.log(res)
        this.ordersHistory = res.result
        this.temp=this.ordersHistory
        // this.totalItems= res.result.recordsCount?.totalCount
         this.orderHistoryTemp =this.ordersHistory
        this.updatePagination();
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }
  purchaseorderdetailsModal(content:any,Purchaseid:any){

    // this.purchaseId =Purchaseid
    this.partnerService.GetPurchaseOrdersDetails(Purchaseid).subscribe((res: any) => {
      
       
        this.purchaseOrderDetailsById = res.result
        
      
       
  
      }, (error) => {
        // console.log(error.err.message);
        // this.spinner.hide();
      })
      this.modalService.open(content, { backdrop: 'static',size: 'lg', keyboard: false,centered: true },).result.then((result) => {
        //  console.log("Modal closed" + result);
      }).catch((res) => { });
  }
  orderHistorydetailsModal(content:any,orderId:any,mvnoAPIid:any){

    // this.purchaseId =Purchaseid
    this.partnerService.GetOrdersDetails(orderId,mvnoAPIid).subscribe((res: any) => {
      
       
        this.OrderDetailsById= res.result
        
        this.xmlRequest = this.formatXML(this.OrderDetailsById[0].partnerRequest);
        this.xmlResponse = this.formatXML(this.OrderDetailsById[0].partnerRequest);
        
      
       
  
      }, (error) => {
        // console.log(error.err.message);
        // this.spinner.hide();
      })
      this.modalService.open(content, { backdrop: 'static',size: 'md', keyboard: false,centered: true },).result.then((result) => {
        //  console.log("Modal closed" + result);
      }).catch((res) => { });
  }

  formatXML(xml: string): string {
    const PADDING = ' '.repeat(2); // Set the indentation level
    const reg = /(>)(<)(\/*)/g;
    let pad = 0;
    xml = xml.replace(reg, '$1\r\n$2$3');
    return xml.split('\r\n').map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      pad += indent;
      return PADDING.repeat(pad - indent) + node;
    }).join('\r\n');
  }



  balanceTiers(content:any){
    this.modalService.open(content, { backdrop: 'static',size: 'sm', keyboard: false,centered: true },).result.then((result) => {
      //  console.log("Modal closed" + result);
    }).catch((res) => { }); 
  }
  queryHLR(){
    this.isLoading = true
    this.nexusservice.queryHlr(this.subcriberDetails?.msisdn,this.subcriberDetails?.iccid,).subscribe((res: any) => {
      
        this.hlrs = res.result
          
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }
  queryUsage(){
    this.isLoading = true
    this.nexusservice.queryUsage(this.subcriberDetails?.msisdn,this.subcriberDetails?.iccid).subscribe((res: any) => {
      
        this.Usage = res.result

        this.thresholds= this.Usage.baseProduct.product[0].usage[0].limit.thresholds
        // console.log(this.Usage.baseProduct.product[0].usage[0].limit.thresholds)
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }


  getpartnerAysncLogs(){
    this.isLoading = true

    this.fromDate = this.asyncForm?.get('fromDate')?.value;
      this.toDate = this.asyncForm?.get('toDate')?.value;
    var from_Date = '';
    var to_Date = '';
  
    let currentDateTime =this.datePipe.transform((new Date), 'MM/dd/yyyy') as string;
    const nowDate = new Date 
    nowDate.setDate(nowDate.getDate() - 1);
    // console.log(nowDate);
  
    let PrevDateTime = this.datePipe.transform((nowDate),'MM/dd/yyyy') as string

    if (this.calcDaysDiff() >= 0)
      {

        if(this.fromDate.month === undefined)
          {
            from_Date= this.getDateFormat(new Date()) 
            // this.dateForm.get('fromDate').setValue({year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()})
            //  this.dateForm.get('toDate').setValue({year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()})
            from_Date = PrevDateTime ||''
            to_Date = currentDateTime || ''
          } 
          else{
              from_Date = `${this.fromDate.month < 10 ? '0'+this.fromDate.month : this.fromDate.month}/${this.fromDate.day < 10 ? '0'+this.fromDate.day : this.fromDate.day}/${this.fromDate.year}`;
              to_Date = `${this.toDate.month < 10 ? '0'+this.toDate.month : this.toDate.month}/${this.toDate.day < 10 ? '0'+this.toDate.day : this.toDate.day}/${this.toDate.year}`;
             }
    this.partnerService.GetPartnerasynclogs(from_Date, to_Date,this.subcriberDetails?.msisdn,this.subcriberDetails?.iccid,this.asyncForm?.value.asynctype).subscribe((res: any) => {
      
        this.asynclogs = res.result.partnerAsyncLogDetails
console.log(this.asynclogs)
this.temp =this.asynclogs
          
        // for (var value of this.){
        //   if(value.status){
        //     this.temp.push(value.status);
        //    //  console.log(this.temp)
        //   }
        // }
  
        // this.temp =  [...new Set(this.temp)]
        // this.temp.unshift('All Orders')
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
        }
  }

  filterDataPurchaseOrderHistory(e:any){
     // get the value of the key pressed and make it lowercase
   let val = e.target.value.toLowerCase();
   // get the amount of columns in the table
  // let colsAmt = this.apihistory.length;
   // get the key names of each column in the dataset
   let keys = Object.keys(this.purchaseOrdersTemp[0]);
   let colsAmt = keys.length;
   // assign filtered matches to the active datatable
   this.PurchaseOrders = this.purchaseOrdersTemp.filter(function(item: any){
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
  filterDataOrderHistory(e:any){
    // get the value of the key pressed and make it lowercase
   let val = e.target.value.toLowerCase();
   // get the amount of columns in the table
  // let colsAmt = this.apihistory.length;
   // get the key names of each column in the dataset
   let keys = Object.keys(this.orderHistoryTemp[0]);
   let colsAmt = keys.length;
   // assign filtered matches to the active datatable
   this.ordersHistory = this.orderHistoryTemp.filter(function(item: any){
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
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  private getDateFormat(date: Date): string {
    return formatDate(date, 'yyyyMMdd_HHmmss', 'en-US');
  }

  
  createDateFromNgbDate(ngbDate: NgbDate): Date {
    const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month-1, ngbDate.day));  
    return date;
  }
  calcDaysDiff(): number {
    const fromDate: Date = this.createDateFromNgbDate(this.fromDate);
    const toDate: Date = this.createDateFromNgbDate(this.toDate);  
    const daysDiff = Math.floor((<any>toDate - <any>fromDate) / (1000*60*60*24));
    // console.log(daysDiff);
        return daysDiff;
  }
  UTCtoLocaldate(utcDateString: string | string[]){
    if (!utcDateString) {
      return;
  }
  
  // append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
  if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
      utcDateString += 'Z';
  }
  
  return utcDateString;
  
  }

  selectedChangePlanCode(event:any)
{
   this.changePlanForm.value.planCode == this.selectedPlanCode
console.log(this.purchasePlanForm.value.planCode )
this.showPlanDetails =true
this.MVNOPlanDetails()
}  
showTiers(values:any,){
    this.VoiceTiers =[]
    this.SMSTiers=[]
    this.DataTiers =[]
  //  console.log(event.target.value)
for(var value of this.purchaseOrderDetailsById.planTierDetails ){
          if(this.purchaseOrderDetailsById.voiceProductId == value.productId && values =='show_voice_tier'){
            this.VoiceTiers.push(value)
            // console.log(this.VoiceTiers)
          } 
          else if(this.purchaseOrderDetailsById.smsProductId == value.productId  && values =='show_sms_tier'){
            this.SMSTiers.push(value)
          } 
          else if(this.purchaseOrderDetailsById.dataProductId == value.productId  && values =='show_data_tier'){
            this.DataTiers.push(value)
          } 

        }
  }


  MVNOmainPlans(){
    this.isLoading = true
    this.partnerService.GetMVNOmainPlans().subscribe((res: any) => {
      

      // console.log(res.result)
         this.mvnomainPlans = res.result
          
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }

  MVNOtopupPlans(){
    this.isLoading = true
    this.partnerService.GetMVNOTopupPlans().subscribe((res: any) => {
     

      // console.log(res.result)
         this.mvnotopupPlans = res.result
          
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }
  ChangePlan(){


    this.submitted=true

    if (this.changePlanForm.invalid) {
      // this.purchasePlanForm.reset()
      return;
     
    }
    this.isLoading = true

    this.nexusservice.changeplan(this.subcriberDetails?.msisdn,this.subcriberDetails?.iccid,this.changePlanForm.value.planCode).subscribe((res: any) => {
      
      
         this.mvnoPlanDetails = res.result
         Swal.fire({
          title: 'Plan Changed sucessfully',
          // text:"Master has been added sucessfully",
          toast: true, position: 'top-end', 
          showConfirmButton: true,
          icon: 'success', // Set the success icon
          confirmButtonColor: '#28a745', // Set the success color
        });
        this.isLoading =false
        this.changePlanForm.reset()
        this.showPlanDetails=false
        this.submitted=false
          
          
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            this.submitted=false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }
  purchasenewPlan(){

    this.submitted=true

    if (this.purchasePlanForm.invalid) {
      // this.purchasePlanForm.reset()
      return;
     
    }


    this.isLoading = true
    this.nexusservice.purchaseplan(this.subcriberDetails?.msisdn, this.purchasePlanForm.value.planCode,this.subcriberDetails?.iccid,).subscribe((res: any) => {
     
     

      // console.log(res.result)
         
          
          
         

          Swal.fire({
            title: 'Top-up added sucessfully',
            // text:"Master has been added sucessfully",
            toast: true, position: 'top-end', 
            showConfirmButton: true,
            icon: 'success', // Set the success icon
            confirmButtonColor: '#28a745', // Set the success color
          });
          this.isLoading =false
          this.purchasePlanForm.reset()
          this.showPlanDetails=false
          this.submitted=false
    
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            this.submitted=false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }
  MVNOPlanDetails(){
    this.isLoading = true
    this.partnerService.GetMVNOPlanDetails(this.selectedPlanCode).subscribe((res: any) => {
      

      console.log(res.result)
         this.mvnoPlanDetails = res.result
          
          
          this.isLoading =false
     
         }, (error) => {
            console.log(error);
            this.isLoading =false
            Swal.fire({
              title: 'Error',
              text: error.resultCode.message,
              toast: true, position: 'top-end', 
              showConfirmButton: true,
             // icon: 'error', // Set the error icon
              confirmButtonColor: '#dc3545', // Set the error color
            });
           // this.spinner.hide();
         })
  }
  resetChangePlan(){
    this.showPlanDetails =false
    this.submitted=false
    this.changePlanForm.reset()

  }
  resetpurchasePlan(){
    this.showPlanDetails =false
    this.submitted=false
    this.purchasePlanForm.reset()
    
  }

  updatePagination(): void {
    this.isLoading=true
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.temp.slice(start, end);
    this.isLoading=false
  }

  onItemsPerPageChange(itemsPerPage: any): void {

    // this.temp=[]
    this.itemsPerPage = itemsPerPage.target.value;
    this.currentPage = 1; // Reset to first page whenever items per page changes
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  // getPageSymbol(current: number) {
  //   return [current - 1];
  // }

  nextPage(): void {
    const totalPages = Math.ceil(this.temp.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  calculateTotalPages(): number {
    return Math.ceil(this.temp.length / this.itemsPerPage);

    
  }

  getTooltipContent(): string {

    if (!this.Usage) {
      return 'Loading data...';
    }

    let content = '';

    if (this.Usage.product && this.Usage.product.length > 0) {
      this.Usage.product.forEach((product: { usage: any[]; productID: any; }) => {
        if (product.usage && product.usage.length > 0) {
          product.usage.forEach(usage => {
            if (usage.limit && usage.limit.thresholds && usage.limit.thresholds.length > 0) {
              content += `Product ID: ${product.productID}, Category: ${usage.limit.category}\n`;
              usage.limit.thresholds.forEach((threshold:any ) => {
                content += `Type: ${threshold.thresholdType}, Value: ${threshold.thresholdValue}, Behavior: ${threshold.behavior}\n`;
              });
              content += '\n';
            }
          });
        }
      });
    }

    return content.trim() ? content.trim() : 'No threshold data available';
  }
    
  
// unwanted todo fro orderresponse
getKeys(obj: any): string[] {
  return Object.keys(obj);
}

}

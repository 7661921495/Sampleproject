import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { DatePipe, formatDate } from '@angular/common'
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit {
  loadingIndicator = true;
  reorderable = true;
  collection: never[];
  isLoading: boolean =false;
  ColumnMode = ColumnMode;
  temp:any [] = [];
  loc:any[]=[];
  rows:any []= [];
  columns = [];
  @Output() editNewUserEvent = new EventEmitter();
  showProviderWindow = false;
  editProviderWindow = false;
  userForm: any;

  constructor(private modalService: NgbModal, public formatter: NgbDateParserFormatter,  
    private formBuilder: FormBuilder,public datepipe: DatePipe) { }

    
    public onFormGroupChangeEvent(_event: any) {
      this.userForm = _event
  
     }

  ngOnInit(): void {
  }

  hideProviderWindow() {
    // this.resetPlatformuser();
     this.showProviderWindow = false;
   }
 
  
   inituserManager(){
   
 this.rows=[]
  
    
   }

   showall(event:any){
    // console.log(event.target.id)
if(event.target.id == 'btnradio1' ){
  // this.rows = this.user_master
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

 
  
   }
  
   showinactive()
   {
    
this.rows=[]
   
 
   
   
  
   }
  edit(event:any) {
    console.log(event)
    
    //  this.platformUser = event;
    //  this.agentroleName = event.roleName
    //  this.roleid = event.roleId
       this.showProviderWindow =true;
    };

    filterUserData(event:any){
      
   
        
       // whenever the filter changes, always go back to the first page
       //this.mytable.offset = 0;
     }

}

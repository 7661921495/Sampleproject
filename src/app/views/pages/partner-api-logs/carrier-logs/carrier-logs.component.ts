import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common'
import { ColumnMode } from '@swimlane/ngx-datatable'
@Component({
  selector: 'app-carrier-logs',
  templateUrl: './carrier-logs.component.html',
  styleUrls: ['./carrier-logs.component.scss']
})
export class CarrierLogsComponent implements OnInit {
  dateForm: FormGroup;
  temp:any [] = [];
  loc:any[]=[];
  rows:any []= [];
  columns = [];
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate ;
  toDate: NgbDate ;
  loadingIndicator = true;
  reorderable = true;
  collection: never[];
  isLoading: boolean =false;
  ColumnMode = ColumnMode;
  constructor(private calendar: NgbCalendar,private modalService: NgbModal, public formatter: NgbDateParserFormatter,  
    private formBuilder: FormBuilder,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      // customer_name: ['', Validators.required],
      fromDate:  ['', Validators.required],
      toDate:  ['', Validators.required],
     apiName:  ['',],
      // choice :['',Validators.required],
      
     });
     const now = new Date(); 
     this.dateForm?.get('fromDate')?.setValue({year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()-1})
     this.dateForm?.get('toDate')?.setValue({year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()})
  }
  getOrdersBydate(){
    
  }


}

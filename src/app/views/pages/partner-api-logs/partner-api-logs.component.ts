import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CompletionOrdersService } from 'src/app/services/completion-orders.service';
//import * as XLSX from 'xlsx';
// import * as saveAs from 'file-saver'
// import { FileSaver } from 'file-saver'
// import { CustomerService } from 'src/app/services/customer-service';

import { DatePipe, formatDate } from '@angular/common'
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-partner-api-logs',
  templateUrl: './partner-api-logs.component.html',
  styleUrls: ['./partner-api-logs.component.scss']
})
export class PartnerApiLogsComponent implements OnInit {
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

// Version 1.0 
// project name : MVNOC ACP RESELLER PLATFORM
// filename : :phone-inventory.ts
// path :src\app\views\pages\sims\phone-inventory
// purpose: functions related to upload  to upload devices
// author: apoorva
// version history: v1.0 initial version
// 
import { Component, OnInit, ViewChild } from '@angular/core';
import { SimService } from 'src/app/core/services/sim-service';
import { PhoneInventoryModel } from '../models/phone-inventory-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-phone-inventory',
  templateUrl: './phone-inventory.component.html',
  styleUrls: ['./phone-inventory.component.scss']
})
export class PhoneInventoryComponent implements OnInit {
  partnerId: any;
  constructor(private formBuilder: FormBuilder,private simService:SimService,public util: UtilsService) { }

  recordsNoHeader: any[];
  simForm: FormGroup;
  file : any;
  public records: any[] = [];
  expDate : any;
  @ViewChild('csvReader') csvReader: any;
  ngOnInit(): void {

    this.partnerId = localStorage.getItem('PartnerId')
    // this.simForm = this.formBuilder.group({
    //   // customer_name: ['', Validators.required],
    //   expDate:  ['', Validators.required],
    //   poNr:  ['', Validators.required],

    //  });
  }

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      this.file = files[0];
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
     console.log(this.records)

     this.recordsNoHeader=this.records.slice(1)
     console.log(this.recordsNoHeader)
      };

      reader.onerror = function () {

        // console.log('Error occured while reading file');
        Swal.fire({
          title: 'Error',
          text:"Error occured while reading file",
          toast: true, position: 'top-end', 
          showConfirmButton: true,
          icon: 'error', // Set the error icon
          confirmButtonColor: '#dc3545', // Set the error color
        });
      };
       
     

    } else {

        Swal.fire({
            title: 'Error',
            text:"Please import valid .csv or .txt file",
            toast: true, position: 'top-end', 
        showConfirmButton: true,
            icon: 'error', // Set the error icon
            confirmButtonColor: '#dc3545', // Set the error color
          });
    //   this.toastrService.error("Please import valid .csv or .txt file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {

    // this.spinner.show();
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: PhoneInventoryModel = new PhoneInventoryModel();
        csvRecord.ICCID = curruntRecord[8].trim();
        csvRecord.MasterRADIDL = curruntRecord[0].trim();
        csvRecord.PalletNumber = curruntRecord[1].trim();
        csvRecord.PONumber = curruntRecord[2].trim();
        csvRecord.CartonNumber1 = curruntRecord[3].trim();
        csvRecord.SKUNumber2 = curruntRecord[4].trim();
        csvRecord.CartonQt = curruntRecord[5].trim();
        csvRecord.IMEI1  = curruntRecord[6].trim();
        csvRecord.IMEI2  = curruntRecord[7].trim();

        // csvRecord.RateCenter = curruntRecord[6].trim().replace("\"", "");


        csvArr.push(csvRecord);
      }
    }
    // this.spinner.hide();
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".txt")||file.name.endsWith(".csv")|| file.name.endsWith(".CSV")||file.name.endsWith(".TXT");
  }

  getHeaderArray(csvRecordsArr: any) {
    // this.spinner.show();
   
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    // this.spinner.hide();
    return headerArray;
  }

  
  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.fileReset();
    // this.simForm.reset();
  }
  onReset() {
    // this.simForm.reset()
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.fileReset()
  }

  saveDevices(){
    // console.log(this.simForm.get('poNr').value)
    // this.expDate = this.simForm.get('expDate').value
    // console.log(this.file);
   // let formData:FormData = new FormData();
   // formData.append('uploadFile', this.file, this.file.name);
   // console.log(formData)
  //  let expiryDate = `${this.expDate.month}/${this.expDate.day < 10 ? '0'+this.expDate.day : this.expDate.day}/${this.expDate.year}`;
   
  }

}

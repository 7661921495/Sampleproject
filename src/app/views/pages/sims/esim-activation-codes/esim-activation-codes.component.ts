// Version 1.0 
// project name : MVNOC ACP RESELLER PLATFORM
// filename : esim-activation-codes.ts
// path :src\app\views\pages\sims\esim-activation-codes
// purpose: functions related to upload esim activation codes
// author: apoorva
// version history: v1.0 initial version
// 
import { Component, OnInit, ViewChild } from '@angular/core';
import { ESimInventoryModel } from '../models/esim-inventory-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimService } from 'src/app/core/services/sim-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-esim-activation-codes',
  templateUrl: './esim-activation-codes.component.html',
  styleUrls: ['./esim-activation-codes.component.scss']
})
export class EsimActivationCodesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private simService : SimService) { }

    simForm: FormGroup;
    file : any;
    // partners : any;
    public records: any[] = [];
    expDate : any;
    @ViewChild('csvReader') csvReader: any;

  ngOnInit(): void {
    // this.simForm = this.formBuilder.group({
    //   // customer_name: ['', Validators.required],
    //   // expDate:  ['', Validators.required],
    //   poNr:  ['', ],

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
        //console.log(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
        console.log(this.records)
      };

      reader.onerror = function () {

        console.log(reader.onerror)
        // Swal.fire({
        //   title: 'Error',
        //   text:"Error occured while reading file",
        //   icon: 'error', // Set the error icon
        //   toast: true, position: 'top-end', 
        // showConfirmButton: true, 
        //   confirmButtonColor: '#dc3545', // Set the error color
        // });
      };

    } else {
      Swal.fire({
        title: 'Error',
        text:"Please import valid .csv or .txt file",
        icon: 'error', // Set the error icon
        toast: true, position: 'top-end', 
        showConfirmButton: true, 
        confirmButtonColor: '#dc3545', // Set the error color
      });
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {

    // this.spinner.show();
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(' ');
      console.log(curruntRecord.length)
     // if (curruntRecord.length == headerLength) {
        let csvRecord: ESimInventoryModel = new ESimInventoryModel();
        csvRecord.ICCID = curruntRecord[0].trim();
        csvRecord.ActivationCode = curruntRecord[1].trim();
      /*   csvRecord.PIN1 = curruntRecord[1].trim();
        csvRecord.PUK1 = curruntRecord[2].trim();
        csvRecord.PIN2 = curruntRecord[3].trim();
        csvRecord.PUK2 = curruntRecord[4].trim(); */

        // csvRecord.RateCenter = curruntRecord[6].trim().replace("\"", "");

        console.log(csvRecord)
        csvArr.push(csvRecord);
     // }
    }
    // this.spinner.hide();
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".txt");
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
  }
  onReset() {
    this.fileReset()
  }

  saveSims(){
    // console.log(this.simForm.get('poNr')?.value)
    // this.expDate = this.simForm.get('expDate')?.value
    console.log(this.file);
   // let formData:FormData = new FormData();
   // formData.append('uploadFile', this.file, this.file.name);
   // console.log(formData)
  //  let expiryDate = `${this.expDate.month}/${this.expDate.day < 10 ? '0'+this.expDate.day : this.expDate.day}/${this.expDate.year}`;
   
  }

}

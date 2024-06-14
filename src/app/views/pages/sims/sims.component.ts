// Version 1.0 
// project name : MVNOC ACP RESELLER PLATFORM
// filename : :sims.ts
// path :src\app\views\pages\sims
// purpose: functions related   to upload sims
// author: apoorva
// version history: v1.0 initial version
// 
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimInventoryModel } from './models/sim-inventory-model';
import { PlatformUserService } from 'src/app/core/services/platformuser-service';
import Swal from 'sweetalert2';
import { SimService } from 'src/app/core/services/sim-service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-sims',
  templateUrl: './sims.component.html',
  styleUrls: ['./sims.component.scss']
})
export class SimsComponent implements OnInit {
  partnerId: any;

  constructor(private formBuilder: FormBuilder,private simService:SimService,public util: UtilsService) { }


  simForm: FormGroup;
  file : any;
  public records: any[] = [];
  expDate : any;
  @ViewChild('csvReader') csvReader: any;
  ngOnInit(): void {

    // this.partnerId = this.util.decrypt_Text(localStorage.getItem('PartnerId'))
    this.simForm = this.formBuilder.group({
      // customer_name: ['', Validators.required],
      // expDate:  ['', Validators.required],
      poNr:  ['', ],

     });
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
    //    console.log(this.records)
      };

      reader.onerror = function () {
        Swal.fire({
          title: 'Error',
          text:"Error occured while reading file",
          icon: 'error', // Set the error icon
          confirmButtonColor: '#dc3545', // Set the error color
        });
      };

    } else {
      Swal.fire({
        title: 'Error',
        text:"Please import valid .csv or .txt file",
        icon: 'error', // Set the error icon
        confirmButtonColor: '#dc3545', // Set the error color
      });
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {

    // this.spinner.show();
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: SimInventoryModel = new SimInventoryModel();
        csvRecord.ICCID = curruntRecord[0].trim();
        csvRecord.IMSI = curruntRecord[5].trim();
        csvRecord.PIN1 = curruntRecord[1].trim();
        csvRecord.PUK1 = curruntRecord[2].trim();
        csvRecord.PIN2 = curruntRecord[3].trim();
        csvRecord.PUK2 = curruntRecord[4].trim();

        // csvRecord.RateCenter = curruntRecord[6].trim().replace("\"", "");


        csvArr.push(csvRecord);
      }
    }
    // this.spinner.hide();
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
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
    this.fileReset();
  }

  saveSims(){
    //  console.log(this.simForm?.get('poNr')?.value)
    // this.expDate = this.simForm.get('expDate')?.value
    // console.log(this.file);
   // let formData:FormData = new FormData();
   // formData.append('uploadFile', this.file, this.file.name);
   // console.log(formData)
  //  let expiryDate = `${this.expDate.month}/${this.expDate.day < 10 ? '0'+this.expDate.day : this.expDate.day}/${this.expDate.year}`;
  
  
  }

}

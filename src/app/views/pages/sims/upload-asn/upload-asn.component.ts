import { Component, OnInit, ViewChild } from '@angular/core';
import { SimInventoryModel } from '../models/sim-inventory-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimService } from 'src/app/core/services/sim-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-asn',
  templateUrl: './upload-asn.component.html',
  styleUrls: ['./upload-asn.component.scss']
})
export class UploadAsnComponent implements OnInit {
  simForm: FormGroup;
  file : any;
  partners : any;
  public records: any[] = [];
  expDate : any;
  @ViewChild('csvReader') csvReader: any;
  constructor(private formBuilder: FormBuilder,private simService:SimService) { }

  ngOnInit(): void {

    this.simForm = this.formBuilder.group({
      // customer_name: ['', Validators.required],
       partner:  ['', Validators.required],

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
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
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
    
  }

  saveSims(){
  //   console.log(this.simForm.get('poNr')?.value)
  //   this.expDate = this.simForm.get('expDate')?.value
  //   console.log(this.file);
  //  // let formData:FormData = new FormData();
  //  // formData.append('uploadFile', this.file, this.file.name);
  //  // console.log(formData)
  //  let expiryDate = `${this.expDate.month}/${this.expDate.day < 10 ? '0'+this.expDate.day : this.expDate.day}/${this.expDate.year}`;
  //  this.simService.uploadSim(this.simForm.get('poNr')?.value,expiryDate,this.file).subscribe((res:any)=>{
  //    console.log(res)
  //  }, (error :any) => {
  //   console.log(error.error.Message);
  //   // this.spinner.hide();
  //   Swal.fire({
  //     title: 'Error',
  //     text: error.error.Message,
      
  //     icon: 'error', // Set the error icon
  //     confirmButtonColor: '#dc3545', // Set the error color
  //   });
  // }
  //  )
  
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { SimService } from 'src/app/core/services/sim-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-esim-qrcode-generation',
  templateUrl: './esim-qrcode-generation.component.html',
  styleUrls: ['./esim-qrcode-generation.component.scss']
})
export class EsimQrcodeGenerationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private simservice:SimService) { }
  simForm: FormGroup;
  file : any;
  partners : any;
  qrCode : string = ''
  public records: any[] = [];
  imageToShow: any;
  expDate : any;
  submitted =false
  isLoading = false
  @ViewChild('csvReader') csvReader: any;

  ngOnInit(): void {

    this.simForm = this.formBuilder.group({
      // customer_name: ['', Validators.required],
       iccid:  ['', Validators.required],

     });
     this.imageToShow = ''
  }
  get f() { return this.simForm.controls }
  onReset() {
    this.submitted=false
    this.simForm.reset()
    this.qrCode = ''
    this.imageToShow = ''
  }
  genrateCode(){
    this.submitted=true
    if(this.simForm.invalid){
      return
    }
  this.imageToShow = ''
  // this.spinner.show()

  this.isLoading=true
   
  // this.qrCode = "../../../../../assets/images/logo.png"
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}

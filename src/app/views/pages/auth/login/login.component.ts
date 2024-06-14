// Version 1.0 
// project name : MVNOC ACP RESELLER PLATFORM
// filename : login.component.ts
// path :src\app\views\pages\auth\
// purpose: functions related to login page
// author: apoorva
// version history: v1.0 initial version
// 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';
import { AuthService } from 'src/app/auth.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';
import { utils } from 'sortablejs';
import Swal from 'sweetalert2';
import { LocalStorageService } from 'src/app/utils/local-storage.service';


declare global {
  interface Window {
    ZohoHCAsap: any;
    ZohoHCAsapSettings: object
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: string[] = [];
  messages: string[] = [];
  returnUrl: string;
  user: any = {};
  submitted: boolean = false;
  loggedIn: boolean = false;
  locationData: any;
  isLoading:boolean =false
  encryptedToken:string

  constructor(private router: Router, protected service: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, public util:  UtilsService,
     private modalService: NgbModal,private localstorage:LocalStorageService) { }


  ngOnInit(): void {
    var admin = localStorage.getItem('AdminRole')
    // get return url from route parameters or default to '/'

    // if (admin != '1'){
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    // }
    // else {
    //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inventory-report/k1-device';
    // }
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]

    });
    /*     window.ZohoHCAsapSettings = {
          hideLauncherIcon: true,
         
      };
      
      
      window.ZohoHCAsap = window.ZohoHCAsap || function ( a: any , b: any ) {
          window.ZohoHCAsap[a] = b;
      };
      
      (function () {
          let d = document;
          let s = document.createElement('script') as unknown as HTMLScriptElement
          s.type = "text/javascript";
          s.defer = true;
          s.src = "https://desk.zoho.com/portal/api/web/inapp/676896000000367001?orgId=761312478";
          d.getElementsByTagName("head")[0].appendChild(s);
      })();*/
  }
  get f() { return this.loginForm.controls }
  logoutScreenOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };


  onSubmit(e:Event) {

    //  this.router.navigateByUrl('/customer/lookup');
    // console.log(this.loginForm);
    
    this.submitted = true;
    if (this.loginForm.invalid) {
      // this.spinner.hide()
      return;

    }
    this.errors = [];
    this.messages = [];
    // let user = this.user;
    this.submitted = true;
   this.isLoading =true
    this.service.login(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value).subscribe((res: any) => {
     
  const jwToken = res.data.token; // Assuming res.data.jwToken is of type 'string | null'
 console.log(jwToken)
//  localStorage.setItem('access_token', this.util.encrypt_Text(jwToken || ""))
         this.handleToken(jwToken)

        
     
        setTimeout(() => {
        if (localStorage.getItem('isLoggedin') === 'true') {
                 location.href = this.returnUrl
        }
       }, 1000);
       this.submitted = false;

       this.isLoading=false
     },
      (err: any) => {
          console.log(err);
        this.isLoading =false
        Swal.fire({
          title: 'Error',
          text: err.error.message,
          toast: true, position: 'top-end', 
          showConfirmButton: true,
         confirmButtonColor: '#dc3545', // Set the error color
        });
       
      }

    );
    

  }

  async  handleToken(jwToken: string) {

    console.log(jwToken)
    if (jwToken !== null)  {
      try {

        
        const encryptedToken = await this.util.encrypt_Text(jwToken);
        console.log('Type of encryptedToken:', typeof encryptedToken);
        console.log('Value of encryptedToken:', encryptedToken);
        if (encryptedToken !== null) {
          localStorage.setItem('access_token', encryptedToken);
          console.log('Access token set in localStorage:', encryptedToken);
          localStorage.setItem('isLoggedin', 'true');
          this.returnUrl = '/customer/lookup';
        } else {
          console.error('Encryption failed for jwToken:', jwToken);
        }
      } catch (error) {
        console.error('An error occurred during encryption:', error);
      }
    } else {
      console.error('jwToken is null');
    }
  }
  
  // Ensure proper context for `this`
  // const context = {
  //   util: new UtilService(new LocalStorageService()),
  //   returnUrl: ''
  // };

  onClick() {
    this.router.navigateByUrl('/auth/forgot-password');
  }
 forgot(content:any){
    this.modalService.open(content, { backdrop: 'static',size: 'md', keyboard: false,centered: true },).result.then((result) => {
   }).catch((res) => { }); 
  
  }
}



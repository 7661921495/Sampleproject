// Version 1.0 
// project name : MVNOC PARTNER PLATFORM
// filename : change-password.component.ts
// path :src\app\views\pages\auth\change-password
// purpose: functions related to change-passoword page
// author: apoorva
// version history: v1.0 initial version
// 
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
// 
enum PwdIconName {
  show = "eye",
  hide = "eye-off"
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  token: string = "";
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;
  is_password_shown: boolean = false;
  password_icon_name = PwdIconName.show;
  pwdType: string = "password";

  changepasswordForm: FormGroup
  userpwd: any;
  useroldpwd: any;
  userNpwd: any;

  constructor(protected service: AuthService, protected router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }
  logoutScreenOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

 
  ngOnInit(): void {
    // this.token = this.route.snapshot.queryParamMap.get('token');
    this.changepasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, ]],
      Password: ['', [Validators.required, ]],
      cPassword: ['', [Validators.required,]]
    })
    console.log(this.token);
  }
  get f() { return this.changepasswordForm.controls }
  options = {
    'placement': 'top',
    'password': {
      'type': "range",
      'min': 6,
      'max': 10
    },
    'shadow': false,
    'offset': 15,
  }


  changePasswordRequest() {
    this.submitted=true
    if (this.changepasswordForm.invalid) {
      return;
    }

    this.showMessages['error'] = false;
    this.errors = [];
    this.messages = [];
    let user = this.user;

    this.userpwd=this.changepasswordForm.get('Password')?.value
    this.useroldpwd=this.changepasswordForm.get('oldPassword')?.value
    this.userNpwd=this.changepasswordForm.get('cPassword')?.value

    if (this.userpwd != this.userNpwd) {
      Swal.fire({
        title: 'warning',
        text: "Password and Confirm password mismatch",
        toast: true, position: 'top-end', 
        icon:"warning",
        showConfirmButton: true,
       confirmButtonColor: '#dc3545', // Set the error color
      });
      // this.toastrService.warning("Password and Confirm password mismatch", "Error");
      return;
    }
    this.submitted = true;
    this.service.changePassword(this.useroldpwd,this.userpwd,this.userNpwd).subscribe((res: any) => {
            this.router.navigate(['auth/login'])
          },
    // throwing error if API call fails
      (error: any) => {
         this.submitted = false;
        this.errors = ['login failed']
        this.showMessages['error'] = true

        Swal.fire({
          title: 'Error',
          text: error.error.Message,
          toast: true, position: 'top-end',
          icon:"error", 
          showConfirmButton: true,
         confirmButtonColor: '#dc3545', // Set the error color
        });
      }
    );
  }
   onEyeClicked() {
    this.is_password_shown = !this.is_password_shown;
    if (this.is_password_shown) {
      this.password_icon_name = PwdIconName.hide;
      this.pwdType = "text";
    }
    else {
      this.password_icon_name = PwdIconName.show;
      this.pwdType = "password";
    }
  }
  Logout(e:any)
  {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data')
    localStorage.removeItem('user_id')
    localStorage.removeItem('roleBasedMenus')
    localStorage.removeItem('Access_Key');
    localStorage.removeItem('Entity')
    localStorage.removeItem('user_token');
    localStorage.removeItem('RoleId');
    localStorage.removeItem('LevelNo');
     // localStorage.setItem('LevelNo',this.util.encrypt_Text(1));
    localStorage.removeItem('PartnerEntityId');
     // localStorage.setItem('PartnerEntityId',this.util.encrypt_Text(1));
     localStorage.removeItem('canAssignSIMs');
     localStorage.removeItem('canCreateLocation');
     localStorage.removeItem('canCreateRole');
     localStorage.removeItem('canCreateUser');
     localStorage.removeItem('cancreateSublevels');
     localStorage.removeItem('trackingURL');
     localStorage.removeItem('locationActive');
     localStorage.removeItem('MultipleLocationIDs');
     localStorage.removeItem('activeLocations');
     localStorage.removeItem('AllLocations');
     localStorage.removeItem('locationId');
    //  this.showproceed=false

    //  localStorage.removeItem('MultipleLocationID');
    localStorage.clear;
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }
 }

// Version 1.0 
// project name :MVNOC ACP RESELLER PLATFORM
// filename :navbar.component.ts
// path :src\app\views\layout\navbar\
// purpose: functions related to logout from application, userprofile viewing, bell icon notifications
// author: apoorva
// version history: v1.0 initial version
// 
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/utils/utils.service';
// 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
// 
export class NavbarComponent implements OnInit {
data:any
userName: string | null;
userEmail: string | null;
// 
  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    public util: UtilsService
  ) { this.data = this.util.decrypt_Text(localStorage.getItem('access_token') || "")
    setInterval(()=> { this.data}, 60000)}
// 
  ngOnInit(): void {
   
    this.data = this.util.decrypt_Text(localStorage.getItem('access_token')|| "")
    // this.userName=  this.util.decrypt_Text(localStorage.getItem('userName'))
    // this.userEmail=  this.util.decrypt_Text(localStorage.getItem('userEmail'))
    if(this.tokenExpired(this.data)){
      //  this.toastrService.error('Session expired , Pleaes Login');
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
       localStorage.removeItem('locationId')
       localStorage.removeItem('partnerID');
       window.location.reload()
      // this.modalService.dismissAll()
      localStorage.clear;
      if (!localStorage.getItem('isLoggedin')) {
        this.router.navigate(['/auth/login']);
      }
      }
  }
  // throw new Error('Method not implemented.');
  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }
  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('access_token');
    localStorage.removeItem('RoleId');
    localStorage.removeItem('AsapOAuthKey')
    localStorage.removeItem('AsapOAuthExpireTimeSpan')
    localStorage.removeItem('AsapOAuthKeyTime')
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }
// 
  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token?.split('.')[1]))).exp;
    // console.log(expiry-Math.floor((new Date).getTime() / 1000))
    // 
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}

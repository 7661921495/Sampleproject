import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { AuthService } from 'src/app/auth.service';
​
​
@Injectable({
  providedIn: 'root'
})
export class   AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const currentUser = this.authService.currentUserValue;
      // if (currentUser == null || currentUser == undefined) {
      //   this.router.navigate(['auth/login'])
      // }
      // var menu_items = JSON.parse(localStorage.getItem('roleBasedMenus'));
     
      // var menu_allowed = [];
      // for(var i = 0;i< menu_items?.length;i++){
      //   menu_allowed.push(menu_items[i].menu_id)
        
      // }
      // // console.log(menu_items);
      // if (menu_allowed.indexOf(next.data?.menu_id) === -1 && Object.keys(next.data).length !== 0 ){
      //   this.router.navigate(['access-denied'])
      // //console.log(next);
      // }
    return true;
  }
​
}
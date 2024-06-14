import { Injectable } from '@angular/core';
import { ROUTES } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router:Router) { }
  setToken(token:string):void{
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn(){
    return this.getToken()!=null;
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['./login']);
  }
  login({email,password}:any):Observable<any>{
    if(email=='adi@gmail.com'&&password=='adi123'){
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({name:'Adinarayana',email:'adi@gmail.com'});
    }
    return throwError(new Error('Failed to login'));
  }
}

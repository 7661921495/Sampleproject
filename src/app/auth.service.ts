import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
​
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
​
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './core/models/user-model';
import { UtilsService } from './utils/utils.service';
​
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    api_url = environment.API_URL;
​
​    public get currentUserValue(): User {
        //  var user_data = this.util.decrypt_Text(localStorage.getItem('currentUser'));
        //   this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user_data));
​
          return this.currentUserSubject.value;
   }
 ​
​
    constructor(private httpClient: HttpClient, public router: Router, public util: UtilsService) {
        //  var user_data = this.util.decrypt_Text(localStorage.getItem('currentUser'));
        //  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user_data));
        //this.currentUser = this.currentUserSubject.asObservable();
    }
    login(username: any, pwd: any) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.httpClient.post<any>(`${this.api_url}/account/login`, {
            userName: username,
            password: pwd
        }, { headers: reqHeader })
    }
​
     activateAccount(userid: any, token: any, password: any, cnfPassword: any) {
         var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
         return this.httpClient.post<any>(`${this.api_url}identity/api/Account/confirm-email/`, {
             "userId": userid,
             "token": token,
             "newPassword": password,
             "confirmNewPassword": cnfPassword
         }
             , { headers: reqHeader })
     }
    // resetpassword(email,password, cnfPassword,Token) {
    //     var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    //     return this.httpClient.post<any>(`${this.api_url}identity/api/Account/reset-password/`, {
    //         email: email,
    //         password: password,
    //         confirmPassword: cnfPassword,
    //         token: Token,
            
            
    //     }, { headers: reqHeader })
    // }
    resetpassword(email:any) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
          return this.httpClient.post<any>(`${this.api_url}identity/api/Account/reset-password/`, {
              email: email,
          
              
              
          }, { headers: reqHeader })
      }

    changePassword(oldPassword: any, newPassword: any, confirmNewPassword: any) {
        // var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.httpClient.post<any>(`${this.api_url}identity/api/Account/change-password/`, {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "confirmNewPassword": confirmNewPassword
        })
    }
​
​
    forgot_password(useremail: any) {
        var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
        return this.httpClient.post<any>(`${this.api_url}identity/api/Account/forgot-password/`, {
            email: useremail
        }, { headers: reqHeader })
    }
    // async getAccessToken() {
    //     try {
    //         const encryptedToken = localStorage.getItem('access_token');
    //         if (!encryptedToken) {
    //             console.error('Access token not found in local storage');
    //             return null;
    //         }
    
    //         const decryptedToken = await this.util.decrypt_Text(encryptedToken);
    //         // console.log(decryptedToken);
    //         return decryptedToken;
    //     } catch (error) {
    //         console.error('Error decrypting access token:', error);
    //         return null;
    //     }
    // }

    getAccessToken() {
        var access_token = this.util.decrypt_Text(localStorage.getItem('access_token')||"");
        return access_token;
    }
    
//     getUserId() {
//         var uid = this.util.decrypt_Text(localStorage.getItem('user_id'));
//         return uid;//encodeURIComponent(uid);
//     }
//     getUserName() {
//         return this.util.decrypt_Text(localStorage.getItem('user_data'));
//     }
// ​ 
//     getUserDetails() {
//         // setTimeout(() => {
//         // window.location.reload()
//     // }, 1000);
//             return this.util.decrypt_Text(localStorage.getItem('currentUser'));

// ​
//     }
    logout() {
        if (localStorage.removeItem('access_token') == null) {
            this.router.navigate(['/auth/login']);
        }
    }

    // getUserInformation(userId :string){
    //     return this.util.post(UtilsServiceService.USER_INFORMATION+'?UserId='+userId,'');
        
    // }
    getUserMenu(userId: string){
         var reqHeader = new HttpHeaders({ 'No-Auth': 'True' })
        return this.httpClient.post<any>(`${this.api_url}identity/api/Account/UserInformation?UserId=`+userId,'')
    }

   
​
​
}
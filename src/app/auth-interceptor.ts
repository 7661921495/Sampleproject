import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import Swal from "sweetalert2";
// import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
        // private toastrService: ToastrService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === "True") {
            return next.handle(req);
        } else {
            return from(this.authService.getAccessToken()).pipe(
                switchMap((accessToken: string | null) => {
                    if (accessToken) {
                        const authReq = req.clone({
                            setHeaders: { Authorization: `Bearer ${accessToken}` },
                        });
                        return next.handle(authReq).pipe(
                            catchError((error: HttpErrorResponse) => {
                                console.error('HTTP Error:', error);
                                if (error.status === 406 || error.status === 0 || error.status === 500 ) {
                                    Swal.fire({
                                         title: 'Session Expired ',
                                        // text: error,
                                        toast: true, position: 'top-end', 
                                        showConfirmButton: true,
                                        // icon: 'error', // Set the success icon
                                        confirmButtonColor: '#dc3545' // Set the error color
                                      });

                                    // this.toastrService.warning("Please Login", "Session Expired");
                                    this.router.navigate(['/auth/login']);
                                }
                                return throwError(error);
                            })
                        );
                    } else {
                        // this.toastrService.error("Session Expired", "Error");
                        this.router.navigate(['/auth/login']);
                        return throwError("Session Expired");
                    }
                }),
                catchError(error => {
                    Swal.fire({
                       
                        toast: true, 
                        position: 'top-end', 
                        showConfirmButton: true,
                        // icon: 'error', // Set the success icon
                        title: 'Token Retrieval Error ',
                        text:error.status,
                       
                        confirmButtonColor: '#dc3545' // Set the error color
                      });
                    console.error('Token Retrieval Error:', error);
                    // setTimeout(function() {
                    //     location.reload();
                    //   }, 1000); // Delay for 1 second before reloading
                    
                    this.router.navigate(['/customer/lookup']);
                    return throwError(error);
                })
            );
        }
    }
}

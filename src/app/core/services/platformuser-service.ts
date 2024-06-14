import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
// export const unknown_picture = "/assets/images/blank-profile.png";
import { map, tap } from 'rxjs/operators'; 
import { ApiResponse } from '../models/api-response';
import { PlatformUser } from '../models/platformuser-model';
import { UtilsService } from 'src/app/utils/utils.service';
// import { __values } from 'tslib';
// import { } from '../core/models/request-models/user-manager-model';
// import { PartNumber } from '../core/models/request-models/part_number';
// import { PlatformUser } from '../core/models/request-models/user-manager-model';
// import { ApiResponse } from '../core/models/api-response';
// 
@Injectable({
    providedIn: 'root'
})
export class PlatformUserService {
    getUsersById(arg0: number) {
      throw new Error('Method not implemented.');
    }
    api_url = environment.API_URL;
    public current_user:  PlatformUser;
    public api_response: ApiResponse< PlatformUser>;
    // public currentUserSubject: BehaviorSubject< PlatformUser> = new BehaviorSubject< PlatformUser>(undefined);

    constructor(private httpClient: HttpClient, private utilsService:  UtilsService) {
    }
   
}





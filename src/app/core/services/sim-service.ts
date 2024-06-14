import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
export const unknown_picture = "/assets/images/blank-profile.png";
import { map, tap } from 'rxjs/operators'; 
import { Sim } from '../models/sim-model';
import { UtilsService } from 'src/app/utils/utils.service';
import { ApiResponse } from '../models/api-response';
// 
@Injectable({
    providedIn: 'root'
})
export class SimService {
    api_url = environment.API_URL;
    public current_user: Sim;
    public api_response: ApiResponse<Sim>;
    // public currentUserSubject: BehaviorSubject<Sim> = new BehaviorSubject<Sim>(undefined);

    constructor(private httpClient: HttpClient, private utilsService: UtilsService) {
    }

  }
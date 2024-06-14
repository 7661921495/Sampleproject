import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
export const unknown_picture = "/assets/images/blank-profile.png";
import { map, tap } from 'rxjs/operators'; 
import { Sim } from '../models/sim-model';
import { UtilsService } from 'src/app/utils/utils.service';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class NexusService {
  api_url = environment.API_URL;
  // public current_user: Sim;
  public api_response: ApiResponse<any>;
  // public currentUserSubject: BehaviorSubject<Sim> = new BehaviorSubject<Sim>(undefined);

  constructor(private httpClient: HttpClient, private utilsService: UtilsService) {

  }
  queryHlr(msisdn:string,iccid:string): Observable<ApiResponse<any>> {
    let obj = {
      "partnerTransactionId": "NPP20240610155113",
      "msisdn": msisdn,
      "iccid": iccid
    }
    return this.utilsService.post(UtilsService.QUERY_HLR,obj);
  
  }
  queryUsage(msisdn:string,iccid:string): Observable<ApiResponse<any>> {
    let obj = {
      "partnerTransactionId": "NPP20240610155113",
      "msisdn": msisdn,
      "iccid": iccid
    }
    return this.utilsService.post(UtilsService.NEXUS_USAGE,obj);
  
  }
  activateSim(iccid:string,planId:string,billingCode:string,zip:string,e911:any): Observable<ApiResponse<any>> {
   
    let obj = {
      "iccid": iccid,
      "planId": planId,
      "billingCode": billingCode,
      "zip": zip,
      "e911Address": {
        "street1": e911.street1,
        "street2": e911.street2,
        "city": e911.city,
        "state": e911.state,
        "zip": e911.zip
      },
      "ngp": ""
    }
    console.log(obj)
    return this.utilsService.put(UtilsService.ACTIVATE_SIM,obj);
  
  }
  purchaseplan(msisdn:string, planId:string,iccid:string,): Observable<ApiResponse<any>> {
    let obj = {
      "partnerTransactionId": "NPP20240610155113",
      "msisdn": msisdn,
      "planId": planId,
      "iccid": iccid
    }
    return this.utilsService.post(UtilsService.PURCHASE_PLAN,obj);
  
  }
  changeplan(msisdn:string,iccid:string,planId:string): Observable<ApiResponse<any>> {
    let obj = {
      "partnerTransactionId": "NPP20240610155113",
      "msisdn": msisdn,
      "iccid": iccid,
      "newPlanId": planId


    }
    return this.utilsService.put(UtilsService.CHANGE_PLAN,obj);
  
  }
  
}

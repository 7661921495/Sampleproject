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
export class PartnerService {
  api_url = environment.API_URL;
  // public current_user: Sim;
  public api_response: ApiResponse<any>;
  // public currentUserSubject: BehaviorSubject<Sim> = new BehaviorSubject<Sim>(undefined);

  constructor(private httpClient: HttpClient, private utilsService: UtilsService) {
  }

  // Subcriber Information
  GetSubcriberInfo(msisdn:string,iccid:string,SubcriberId:string): Observable<ApiResponse<any>> {
    let obj = {
      "partnerTransactionId": "PA45454",
      "mvnoPartnerId": 14,
      "msisdn": msisdn,
      "iccid": iccid,
      "subscriberId": SubcriberId
    }
    return this.utilsService.post(UtilsService.GET_SUBSCRIBER_INFORMATION,obj);

}
//  MVNO Topup Plans
GetMVNOTopupPlans(): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "mvnoPartnerId": 14,
   
  }
  return this.utilsService.post(UtilsService.GET_MVNO_TOPUP_PLANS,obj);

}
// MVNO main plans
GetMVNOmainPlans(): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "mvnoPartnerId": 14,
   
  }
  return this.utilsService.post(UtilsService.GET_MVNO_MAIN_PLANS,obj);

}
//MVNO plan details
GetMVNOPlanDetails(plancode:string): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "mvnoPartnerId": 14,
    "planCode": plancode
   
  }
  return this.utilsService.post(UtilsService.GET_MVNO_PLAN_DETAILS,obj);

} 

// MVNO partner WPS
GetMVNOPartnerWPS(): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "mvnoPartnerId": 14,
    
   
  }
  return this.utilsService.post(UtilsService.GET_MVNO_PARTNER_WPS,obj);

}

// Orders History Summary
GetOrdersSummary(Subcriberid:number): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "mvnoPartnerId": 14,
    "subscriberId" : Subcriberid
    
   
  }
  return this.utilsService.post(UtilsService.GET_ORDERHISTORY_SUMMARY,obj);

}
// Orders History Details
GetOrdersDetails(id:number,mvnoAPIId:number): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "mvnoPartnerId": 14,
    "mvnoApiTypeId": mvnoAPIId,
    "orderId": id
  }
  return this.utilsService.post(UtilsService.GET_ORDERHISTORY_DETAILS,obj);

}

// purchase orders summary
GetPurchaseOrdersSummary(Subcriberid:number): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "mvnoPartnerId": 14,
    "subscriberId" : Subcriberid
    
   
  }
  return this.utilsService.post(UtilsService.PURCHASE_ORDER_SUMMARY,obj);

}
// purchase order details
GetPurchaseOrdersDetails(id:number): Observable<ApiResponse<any>> {
  let obj = {
    "partnerTransactionId": "PA45454",
    "id" : id,
    "mvnoPartnerId": 14,
    
    
   
  }
  return this.utilsService.post(UtilsService.PURCHASE_ORDER_DETAILS,obj);

}

// partner async logs
GetPartnerasynclogs(fromDate:string,todate:string,iccid:string,msisdn:string,type:string): Observable<ApiResponse<any>> {
  // let obj = {
  //   "partnerTransactionId": "PA45454",
  //   "fromDate": fromDate,
  //   "toDate": todate,
  //   "mvnoPartnerId": 13,
  //   "iccid": iccid,
  //   "msisdn": msisdn,
  //   "asyncType": type,
  //   "pageindex": 0
  // }

  let obj =  {
    "partnerTransactionId": "PA5454",
    "fromDate": "01/01/2024",
    "toDate": "06/10/2024",
    "mvnoPartnerId": 13,
    "iccid": "",
    "msisdn": "",
    "asyncType": "Roaming",
    "pageindex": 0
  }
  return this.utilsService.post(UtilsService.GET_MVNO_PARTNER_ASYNC_LOGS,obj);

}
// 

}

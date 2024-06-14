// Version 1.0 
// project name :MVNOC PARTNER PLATFORM
// filename :layout.module.ts
// path :src\app\utils
// purpose: functions related to http requests
// author: apoorva
// version history: v1.0 initial version
// 
import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
// import * as CryptoJS from 'crypto-js';
@Injectable({
    providedIn: 'root',
})
export class UtilsService {
  public Datashare : EventEmitter<any> = new EventEmitter<any>();
  public static BASE_URL = environment.API_URL
     public static IDENTITY_BASE_URL = UtilsService.BASE_URL

     public static  NEXUS_API_URL = "https://dev.api.nexus.mvnoc.ai"
  
// public static SIM_BASE_URL = UtilsService.BASE_URL+'sim/'
  public static LOGIN = UtilsService. IDENTITY_BASE_URL  + '/account/login'
  
  
//   Partner Portal URLS
public static  GET_SUBSCRIBER_INFORMATION = UtilsService. IDENTITY_BASE_URL  + '/partner/subscriber_information'   //partnersubscriberinformation
public static  GET_ORDERHISTORY_SUMMARY = UtilsService. IDENTITY_BASE_URL  + '/partner/order_history_summary'      //partnerorderhistorysummary
public static  GET_ORDERHISTORY_DETAILS = UtilsService. IDENTITY_BASE_URL  + '/partner/order_history_details'      //partnerorderhistorysummary
public static  PURCHASE_ORDER_SUMMARY = UtilsService. IDENTITY_BASE_URL  + '/partner/purchase_order_summary'      //partnerpurchaseordersummary
public static  PURCHASE_ORDER_DETAILS = UtilsService. IDENTITY_BASE_URL  + '/partner/purchase_order_details'      //partnerpurchaseorderdetails
public static  GET_MVNO_MAIN_PLANS = UtilsService. IDENTITY_BASE_URL  + '/partner/get_mvno_main_plans'            //partnermvnomainplans
public static  GET_MVNO_TOPUP_PLANS = UtilsService. IDENTITY_BASE_URL  + '/partner/get_mvno_topup_plans'          //partnermvnotopupplans
public static  GET_MVNO_PLAN_DETAILS = UtilsService. IDENTITY_BASE_URL  + '/partner/get_mvno_plan_details'        //partnermvnoplandetails
public static  GET_MVNO_PARTNER_WPS = UtilsService. IDENTITY_BASE_URL  + '/partner/get_mvno_partner_wps'          //partnermvnowps
public static  GET_MVNO_PARTNER_ASYNC_LOGS = UtilsService. IDENTITY_BASE_URL  + '/partner/partner_async_logs'     //partnerasynclogs
//   Nexus APIs
public static  QUERY_HLR = UtilsService. IDENTITY_BASE_URL  + '/nexusapi/hlr'   //nexusqueryhlr
public static  NEXUS_USAGE = UtilsService. IDENTITY_BASE_URL  + '/nexusapi/usage'      //nexususage
public static  ACTIVATE_SIM = UtilsService. IDENTITY_BASE_URL  + '/nexusapi/add_customer'      //nexusactivatesim
public static  PURCHASE_PLAN = UtilsService. IDENTITY_BASE_URL  + '/nexusapi/plan_purchase'      //nexusactivatesim
public static  CHANGE_PLAN = UtilsService. IDENTITY_BASE_URL  + '/nexusapi/plan_change'      //nexusactivatesim
public static  PARTNER_API_LOGS = UtilsService. IDENTITY_BASE_URL  + '/nexusapi/partner_api_logs'
  public static  CARRIER_API_LOGS = UtilsService. IDENTITY_BASE_URL  + '/logs/carrier_api_logs'
  public static  CARRIER_API_LOGS_SUMMARY = UtilsService. IDENTITY_BASE_URL  + '/logs/carrier_api_log_summary'
  public static  PARTNER_API_LOGS_SUMMARY = UtilsService. IDENTITY_BASE_URL  + '/nexusapi/partner_api_log_summary'


  constructor(private httpClient: HttpClient,private localStorageService: LocalStorageService) {}
// 
  public post(url: string, object: any): Observable<any> {

      return this.httpClient.post(url, object);
  }

  public post_promise(url: string, object: any): Promise<any> {

      return this.httpClient.post(url, object).toPromise();
  }

  public put(url: string, object: any): Observable<any> {

      return this.httpClient.put(url, object);
  }

  public get(url: string): Observable<any> {
      return this.httpClient.get(url);
  }

  public delete(url: string): Observable<any> {

      return this.httpClient.delete(url);
  }
  async encrypt_Text(data: string): Promise<string | null> {
    if (data == null) {
      return Promise.resolve(null);
    }
    return this.localStorageService.encryptText(data)
      .then(output => output !== null ? output.toString() : null)
      .catch(error => {
        console.error('Encryption failed:', error);
        return null;
      });
  }

  async decrypt_Text(data: string): Promise<string | null> {
    if (data == null) {
      return Promise.resolve(null);
    }
    return this.localStorageService.decryptText(data)
      .then(output => output !== null ? output.toString() : null)
      .catch(error => {
        console.error('Decryption failed:', error);
        return null;
      });
  }





  /****** BackUP CryptoJS */
  // encrypt_Text(data: string) {
  //   if (data == null) {
  //     return null;
  //   }
  //   var output = "";
  //   output = CryptoJS.AES.encrypt(data, "rsygjxzium$#@!").toString();
  //   return output;
  // }

  // decrypt_Text(data: any) {
  //     if (data == null) {
  //         return null;
  //     }
  //     var output = "";
  //     output = CryptoJS.AES.decrypt(data, "rsygjxzium$#@!").toString(CryptoJS.enc.Utf8);
  //     return output;
  // }
  sharedData(object : any)
  {
      this.Datashare.emit(object);
      
  }
}

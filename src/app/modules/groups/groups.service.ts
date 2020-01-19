import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getGroups(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Groups/GetGroups",searchCriteria);
  }
  getGroupBasicData(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Groups/GetGroupBasicData",{id:id});
  }
  getGroupFlightData(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Groups/GetGroupFlightData",{id:id});
  }
  getGroupHotelData(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Groups/GetGroupHotelData",{id:id});
  }
 
  getGroupsDeliveryDataById(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Groups/GetGroupsDeliveryData",{id:id});
  }
  getFlightNumbers():Observable<any>
  {
    return this.http.get(this.baseUrl+"Groups/GetFlightNumbers");
  }
  getGroupStatusList():Observable<any>
  {
    return this.http.get(this.baseUrl+"Groups/GetGroupStatusList");
  }
  getUsersList():Observable<any>
  {
    return this.http.get(this.baseUrl+"Groups/GetUsersList");
  }
 
}

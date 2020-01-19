import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getHotels(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Hotels/GetHotels",searchCriteria);
  }
  getCitiesList():Observable<any>
  {
    return this.http.get(this.baseUrl+"Hotels/GetCitiesList");

  }
  addHotel(addModel):Observable<any>
  {
    return this.http.post(this.baseUrl+"Hotels/AddHotel",addModel);
  }
  getHotelById(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Hotels/GetHotelById",{id:id});
  }
  updateHotel(updateModel):Observable<any>
  {
    return this.http.post(this.baseUrl+"Hotels/UpdateHotel",updateModel);
  }
  deleteHotel(id){
    return this.http.post(this.baseUrl+"Hotels/DeleteHotel",{id:id});

  }
}

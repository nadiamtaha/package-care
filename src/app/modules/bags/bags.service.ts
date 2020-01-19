import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BagsService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getBags(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Bags/GetBags",searchCriteria);
  }

  getBagById(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Bags/GetBagStatusHistory",{id:id});
  }
}
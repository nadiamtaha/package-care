import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DashboardStatisticsService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { 

  }
  getDashboardStatistical(date):Observable<any>
  {
    return this.http.post(this.baseUrl+"Home/GetDashboardStatistics",{Date:date});
  }
}

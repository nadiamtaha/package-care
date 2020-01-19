import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getFlights(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Flights/GetFlights",searchCriteria);
  }

  addFlight(addModel):Observable<any>
  {
    return this.http.post(this.baseUrl+"Flights/AddFlight",addModel);
  }
  getFlightById(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Flights/GetFlightById",{id:id});
  }
  updateFlight(updateModel):Observable<any>
  {
    return this.http.post(this.baseUrl+"Flights/UpdateFlight",updateModel);
  }
  deleteFlight(id)
  {
    return this.http.post(this.baseUrl+"Flights/DeleteFlight",{id:id});

  }
  getAirlinesList(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Flights/GetAirlinesList",searchCriteria);

  }
  getAirportsList(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Flights/GetAirportsList",searchCriteria);

  }
}

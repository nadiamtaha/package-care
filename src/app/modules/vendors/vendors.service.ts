import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getVendors(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Vendors/GetVendors",searchCriteria);
  }
  addVendor(addModel)
  {
    return this.http.post(this.baseUrl+"Vendors/AddVendor",addModel);
  }
  getVendorById(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Vendors/GetVendorById",{id:id});
  }
  updateVendor(updateModel)
  {
    return this.http.post(this.baseUrl+"Vendors/UpdateVendor",updateModel);
  }
  deleteVendor(id){
    return this.http.post(this.baseUrl+"Vendors/DeleteVendor",{id:id});

  }
}


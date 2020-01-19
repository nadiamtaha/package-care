import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getUsers(searchCriteria):Observable<any>
  {
    return this.http.post(this.baseUrl+"Users/GetUsers",searchCriteria);
  }
  getRolesList():Observable<any>
  {
    return this.http.get(this.baseUrl+"Users/GetRoles");

  }
  addUser(addModel):Observable<any>
  {
    return this.http.post(this.baseUrl+"Users/AddUser",addModel);
  }
  getUserById(id):Observable<any>
  {
    return this.http.post(this.baseUrl+"Users/GetUserById",{id:id});
  }
  updateUser(updateModel):Observable<any>
  {
    return this.http.post(this.baseUrl+"Users/UpdateUser",updateModel);
  }
  deleteUser(id){
    return this.http.post(this.baseUrl+"Users/DeleteUser",{id:id});

  }
}

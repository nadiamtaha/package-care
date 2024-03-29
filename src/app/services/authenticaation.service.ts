import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginUrl='http://192.168.2.4/BaggageCare/api/token';
  constructor(private http:HttpClient) { }

  public login(user):Observable<any>
  {  
    var credintials =`username=${user.username}&password=${user.password}&grant_type=password`;
    return this.http.post(this.loginUrl,credintials)
  }
 
  
}

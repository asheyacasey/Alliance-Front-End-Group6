import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080/user/";

  constructor(private httpClient: HttpClient) { }

  loginAuth(loginInfo: any) {
    return this.httpClient.post(this.baseUrl + "login", loginInfo);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080/user/";

  constructor(private httpClient: HttpClient) { }

  loginAuth(userInfo: User) {
    return this.httpClient.post(this.baseUrl + "login", { userInfo });
  }
}

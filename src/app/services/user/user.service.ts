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

  createUser(userInfo: any) {
    return this.httpClient.post(this.baseUrl + "create", userInfo);
  }

  getAllUsers() {
    return this.httpClient.get(this.baseUrl + "all").pipe(
      map((response) => {
        var users = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (key === "data")
              users.push(...(response as any)[key]);
          }
        }
        return users;
      })
    );
  }

  deleteUser(userID: any) {
    return this.httpClient.delete(this.baseUrl + "delete/" + userID);
  }

}

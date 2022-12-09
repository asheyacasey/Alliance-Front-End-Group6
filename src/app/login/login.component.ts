import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user/user.model';
import { UserService } from '../services/user/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userSrvc: UserService, private lForm: FormBuilder, private router: Router) { }

  loginForm = this.lForm.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  loginUser() {
    var loginInfo: FormData = new FormData();

    loginInfo.append('username', this.lFormInfo['username'].value);
    loginInfo.append('password', this.lFormInfo['password'].value);

    this.userSrvc.loginAuth(loginInfo).pipe(
      map((response: any) => {
        if (response.status == "SUCCESS") {
          localStorage.setItem('userID', response.data.userID);

          switch (response.data.userRole) {
            case "Customer":
              localStorage.setItem('userRole', "Customer");
              break;
            case "Admin":
              localStorage.setItem('userRole', "Admin");
              break;
            case "Sales":
              localStorage.setItem('userRole', "Sales");
              break;
            case "Billing In-Charge":
              localStorage.setItem('userRole', "Billing In-Charge");
              break;
            case "Collection In-Charge":
              localStorage.setItem('userRole', "Collection In-Charge");
              break;
          }

          this.router.navigateByUrl('/dashboard');
        }
      }))
      .subscribe((response) => {
        console.log(response);
      });
  }

  get lFormInfo() {
    return this.loginForm.controls;
  }
}

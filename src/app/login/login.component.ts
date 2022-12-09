import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userSrvc: UserService, private lForm: FormBuilder) { }

  isUser: any;
  isAdmin: any;
  isSales: any;
  isBilling: any;
  isCollection: any;

  loginForm = this.lForm.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  loginUser() {
    const userInfo: User = {
      username: this.lFormInfo['username'].value,
      password: this.lFormInfo['password'].value
    };

    this.userSrvc.loginAuth(userInfo)
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }

  get lFormInfo() {
    return this.loginForm.controls;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userRole: any;
  isAdmin: any;
  isCustomer: any;
  isSales: any;
  isBilling: any;
  isCollection: any;
  userInfo: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userSrvc: UserService, private uForm: FormBuilder) { }

  userForm = this.uForm.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['', Validators.required],
  });

  ngOnInit(): void {
    this.userInfo = this.data.user;
    console.log(this.userInfo['userID']);

    this.userRole = localStorage.getItem('userRole');

    switch (this.userRole) {
      case "Customer":
        this.isCustomer = true;
        break;
      case "Admin":
        this.isAdmin = true;
        break;
      case "Sales":
        this.isSales = true;
        break;
      case "Billing In-Charge":
        this.isBilling = true;
        break;
      case "Collection In-Charge":
        this.isCollection = true;
        break;
    }

  }

  editUser() {
    var userInfo: FormData = new FormData();

    if (this.userForm.valid) {
      userInfo.append('username', this.uFormInfo['username'].value.toString());
      userInfo.append('userEmail', this.uFormInfo['email'].value.toString());
      userInfo.append('password', this.uFormInfo['password'].value.toString());
      userInfo.append('userFname', this.uFormInfo['firstName'].value.toString());
      userInfo.append('userLname', this.uFormInfo['lastName'].value.toString());
      userInfo.append('userRole', this.uFormInfo['role'].value.toString());

      this.userSrvc.editUser(userInfo, this.userInfo['userID']).subscribe((res) => {
        console.log(res);
        if (confirm("User was sucessfully updated!")) {
          window.location.reload();
        }
      })
    }
    else {
      alert("Cannot update user!\nPlease don\'t leave any field empty.");
    }
  }

  get uFormInfo() {
    return this.userForm.controls;
  }
}

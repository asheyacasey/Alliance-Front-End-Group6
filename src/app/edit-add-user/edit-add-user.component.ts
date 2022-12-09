import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-edit-add-user',
  templateUrl: './edit-add-user.component.html',
  styleUrls: ['./edit-add-user.component.css']
})
export class EditAddUserComponent implements OnInit {

  constructor(private userSrvc: UserService, private uForm: FormBuilder) { }

  userForm = this.uForm.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['', Validators.required],
  });

  createUser() {
    var userInfo: FormData = new FormData();

    if (this.userForm.valid) {
      userInfo.append('userEmail', this.uFormInfo['email'].value.toString());
      userInfo.append('username', this.uFormInfo['username'].value.toString());
      userInfo.append('password', this.uFormInfo['password'].value.toString());
      userInfo.append('userFname', this.uFormInfo['firstName'].value.toString());
      userInfo.append('userLname', this.uFormInfo['lastName'].value.toString());
      userInfo.append('userRole', this.uFormInfo['role'].value.toString());

      this.userSrvc.createUser(userInfo).subscribe((res) => {
        console.log(res);
        if (confirm('User was successfully created!')) {
          window.location.reload();
        }
      })
    }
    else {
      alert('Cannot create user!\nProvide required details.');
    }
  }

  ngOnInit(): void {
  }

  get uFormInfo() {
    return this.userForm.controls;
  }

}

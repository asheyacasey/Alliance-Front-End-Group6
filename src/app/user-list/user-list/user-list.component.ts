import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditAddUserComponent } from 'src/app/edit-add-user/edit-add-user.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userRole: any;
  isAdmin: any;
  isCustomer: any;
  isSales: any;
  isBilling: any;
  isCollection: any;
  userList$: any;

  constructor(public dialog: MatDialog, private userSrvc: UserService) { }

  addDialog() {
    this.dialog.open(EditAddUserComponent);
  }

  deleteUser(userID: any) {
    if (confirm('Delete user?')) {
      this.userSrvc.deleteUser(userID).subscribe((res) => {
        window.location.reload();
      })
    }
  }

  getUsers() {
    this.userSrvc.getAllUsers().subscribe((data) => {
      this.userList$ = data;
    })
  }

  ngOnInit(): void {
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

    this.getUsers();
  }

}

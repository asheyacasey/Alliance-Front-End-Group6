import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementDataSource, UserManagementItem } from './user-management-datasource';
import { EditAddUserComponent } from '../edit-add-user/edit-add-user.component';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit {

  userRole: any;
  isAdmin: any;
  isCustomer: any;
  isSales: any;
  isBilling: any;
  isCollection: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserManagementItem>;
  dataSource: UserManagementDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userID', 'name', 'lname', 'fname', 'role', 'password', 'edit', 'delete',];

  constructor(public dialog: MatDialog) {
    this.dataSource = new UserManagementDataSource();
  }

  addDialog() {
    this.dialog.open(EditAddUserComponent);
  }

  openDialog() {
    this.dialog.open(NewTicketComponent);
  }

  editDialog() {
    this.dialog.open(EditTicketComponent);
  }

  ngAfterViewInit(): void {
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

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

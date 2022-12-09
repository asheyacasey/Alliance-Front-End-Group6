import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NewTicketComponent } from '../new-ticket/new-ticket.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { MatIconModule } from '@angular/material/icon';

import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { FileAttachComponent } from '../file-attach/file-attach.component';
import { TicketService } from '../services/ticket/ticket.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {

  userRole: any;
  isAdmin: any;
  isCustomer: any;
  isSales: any;
  isBilling: any;
  isCollection: any;
  ticketList$: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['ticketID', 'assigneeID', 'status', 'subject', 'description', 'tracker', 'requesterID', 'createdAt', 'edit', 'delete', 'attach'];

  constructor(public dialog: MatDialog, private tickSrvc: TicketService) {
    this.dataSource = new DataTableDataSource();
  }

  openDialog() {
    this.dialog.open(NewTicketComponent);
  }

  editDialog() {
    this.dialog.open(EditTicketComponent);
  }

  attachDialog() {
    this.dialog.open(FileAttachComponent);
  }

  // getTickets() {
  //   var loggedUser = localStorage.getItem('userRole');

  //   if (loggedUser == "Admin") {
  //     this.tickSrvc.getAllTickets()
  //       .subscribe((data) => {
  //         this.ticketList$ = data;
  //       })
  //   }
  //   else if (loggedUser == "Customer") {
  //     this.tickSrvc.getCustomerTicks()
  //       .subscribe((data) => {
  //         this.ticketList$ = data;
  //       })
  //   }
  //   else {
  //     this.tickSrvc.getPersonnelTicks()
  //       .subscribe((data) => {
  //         this.ticketList$ = data;
  //       })
  //   }
  // }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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
  }
}



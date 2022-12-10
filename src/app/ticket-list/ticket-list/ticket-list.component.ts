import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTicketComponent } from 'src/app/edit-ticket/edit-ticket.component';
import { FileAttachComponent } from 'src/app/file-attach/file-attach.component';
import { NewTicketComponent } from 'src/app/new-ticket/new-ticket.component';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  userRole: any;
  isAdmin: any;
  isCustomer: any;
  isSales: any;
  isBilling: any;
  isCollection: any;
  ticketList$: any;

  constructor(public dialog: MatDialog, private tickSrvc: TicketService) { }

  openDialog() {
    this.dialog.open(NewTicketComponent);
  }

  editDialog(ticket: any) {
    this.dialog.open(EditTicketComponent, { data: { ticket } });
  }

  attachDialog(ticketID: any) {
    this.dialog.open(FileAttachComponent, { data: { ticketID } });
  }

  getTickets() {
    var loggedUser = localStorage.getItem('userRole');

    if (loggedUser == "Admin") {
      this.tickSrvc.getAllTickets()
        .subscribe((data) => {
          this.ticketList$ = data;
        })
    }
    else if (loggedUser == "Customer") {
      this.tickSrvc.getCustomerTicks()
        .subscribe((data) => {
          this.ticketList$ = data;
        })
    }
    else {
      this.tickSrvc.getPersonnelTicks()
        .subscribe((data) => {
          this.ticketList$ = data;
        })
    }
  }

  deleteTicket(ticketID: any) {
    if (confirm('Delete ticket?')) {
      this.tickSrvc.deleteTicket(ticketID).subscribe((res) => {
        window.location.reload();
      });
    }
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

    this.getTickets();
  }

}

import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket/ticket.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  userRole: any;
  isAdmin: any;
  isCustomer: any;
  isSales: any;
  isBilling: any;
  isCollection: any;

  constructor(private tickSrvc: TicketService) { }

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

  generateAllTickets() {
    this.tickSrvc.exportAllTickets().subscribe((response) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response], { type: 'text/csv' }));
      link.download = "AllTickets" + '.csv';
      link.click();
    })
  }

  generatePerTickCount() {
    this.tickSrvc.exportPerTickCount().subscribe((response) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([response], { type: 'text/csv' }));
      link.download = "PersonnelTicketCount" + '.csv';
      link.click();
    })
  }

}

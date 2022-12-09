import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {

  userRole: any;
  isAdmin: any;
  isCustomer: any;
  isSales: any;
  isBilling: any;
  isCollection: any;
  ticketForm!: FormGroup;

  constructor(private tickSrvc: TicketService, private tForm: FormBuilder) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole');

    switch (this.userRole) {
      case "Customer":
        this.isCustomer = true;
        this.ticketForm = this.tForm.group({
          subject: ['', Validators.required],
          description: ['', Validators.required],
        });
        break;
      case "Admin":
        this.isAdmin = true;
        this.ticketForm = this.tForm.group({
          assignee: ['', Validators.required],
          status: ['', Validators.required],
          tracker: ['', Validators.required],
          subject: ['', Validators.required],
          description: ['', Validators.required],
        });
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

  updateTick() {

  }

}

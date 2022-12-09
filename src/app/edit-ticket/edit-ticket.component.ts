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
    var ticketInfo: FormData = new FormData();

    if (this.ticketForm.valid) {
      ticketInfo.append('assigneeID', this.tFormInfo['assignee'].value.toString());
      ticketInfo.append('status', this.tFormInfo['status'].value.toString());
      ticketInfo.append('tracker', this.tFormInfo['tracker'].value.toString());
      ticketInfo.append('subject', this.tFormInfo['subject'].value.toString());
      ticketInfo.append('description', this.tFormInfo['description'].value.toString());

      this.tickSrvc.editTicket(ticketInfo).subscribe((res) => {
        console.log(res);
        if (confirm('Ticket was successfully updated!')) {
          window.location.reload();
        }
      })
    }
    else {
      alert("Cannot update ticket!\nPlease don\'t leave any field empty");
    }
  }

  get tFormInfo() {
    return this.ticketForm.controls;
  }

}

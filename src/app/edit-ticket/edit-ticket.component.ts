import { Component, OnInit, Inject } from '@angular/core';
import { TicketService } from '../services/ticket/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  ticketInfo: any = [];
  ticketForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private tickSrvc: TicketService, private tForm: FormBuilder) { }

  ngOnInit(): void {
    this.ticketInfo = this.data.ticket;
    console.log(this.ticketInfo['ticketID']);

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
      if (this.userRole == "Admin") {
        ticketInfo.append('assigneeID', this.tFormInfo['assignee'].value.toString());
        ticketInfo.append('status', this.tFormInfo['status'].value.toString());
        ticketInfo.append('tracker', this.tFormInfo['tracker'].value.toString());
        ticketInfo.append('subject', this.tFormInfo['subject'].value.toString());
        ticketInfo.append('description', this.tFormInfo['description'].value.toString());
      }
      else if (this.userRole == "Customer") {

        ticketInfo.append('assigneeID', this.ticketInfo['assigneeID'].toString());
        ticketInfo.append('status', this.ticketInfo['status'].toString());
        ticketInfo.append('tracker', this.ticketInfo['tracker'].toString());
        ticketInfo.append('subject', this.tFormInfo['subject'].value.toString());
        ticketInfo.append('description', this.tFormInfo['description'].value.toString());
      }

      this.tickSrvc.editTicket(ticketInfo, this.ticketInfo['ticketID']).subscribe((res) => {
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

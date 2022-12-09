import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketService } from '../services/ticket/ticket.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit {
  currentDate = new Date();
  transformedDate: any;
  pipe = new DatePipe('en-US');
  loggedUser = JSON.parse(localStorage.getItem('userID') || '{}');

  constructor(private tickSrvc: TicketService, private tForm: FormBuilder, private datePipe: DatePipe) {
  }

  ticketForm = this.tForm.group({
    subject: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    this.transformedDate = this.datePipe.transform(this.currentDate, "yyyy-MM-dd");
  }

  createTick() {
    var ticketInfo: FormData = new FormData();

    if (this.ticketForm.valid) {
      ticketInfo.append('status', "New");
      ticketInfo.append('subject', this.tFormInfo['subject'].value.toString());
      ticketInfo.append('description', this.tFormInfo['description'].value.toString());
      ticketInfo.append('requesterID', this.loggedUser.toString());
      ticketInfo.append('createdAt', this.transformedDate.toString());

      this.tickSrvc.createTicket(ticketInfo).subscribe((res) => {
        console.log(res);
        if (confirm('Ticket was successfully created!')) {
          window.location.reload();
        };
      })
    }
    else {
      alert('Cannot create ticket!\nProvide required details.');
    }
  }

  get tFormInfo() {
    return this.ticketForm.controls;
  }
}

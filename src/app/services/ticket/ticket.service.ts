import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = "http://localhost:8080/ticket/";
  loggedUser = localStorage.getItem('userID');

  constructor(private httpClient: HttpClient) { }

  createTicket(ticketInfo: any) {
    return this.httpClient.post(this.baseUrl + "create", ticketInfo);
  }

  getAllTickets() {
    return this.httpClient.get(this.baseUrl + "all").pipe(
      map((response) => {
        var tickets = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (key === "data") {
              tickets.push(...(response as any)[key]);
            }
          }
        }
        return tickets;
      })
    );
  }

  getCustomerTicks() {
    return this.httpClient.get(this.baseUrl + "user/" + this.loggedUser).pipe(
      map((response) => {
        var tickets = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (key === "data") {
              tickets.push(...(response as any)[key]);
            }
          }
        }

        return tickets;
      })
    );
  }

  getPersonnelTicks() {
    return this.httpClient.get(this.baseUrl + "personnel/" + this.loggedUser).pipe(
      map((response) => {
        var tickets = [];

        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (key === "data") {
              tickets.push(...(response as any)[key]);
            }
          }
        }

        return tickets;
      })
    );
  }

  exportAllTickets() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/csv');

    return this.httpClient.get(this.baseUrl + "export-all-tickets", {
      headers: headers,
      responseType: 'text'
    });
  }

  exportPerTickCount() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/csv');

    return this.httpClient.get(this.baseUrl + "export-personnel-ticket-count", {
      headers: headers,
      responseType: 'text'
    });
  }

}

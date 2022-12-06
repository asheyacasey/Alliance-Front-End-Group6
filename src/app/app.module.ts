import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSortModule } from '@angular/material/sort';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DataTableComponent,
    NewTicketComponent,
    EditTicketComponent,
  ],
  entryComponents: [NewTicketComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

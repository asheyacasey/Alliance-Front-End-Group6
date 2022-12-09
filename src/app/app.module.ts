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
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EditAddUserComponent } from './edit-add-user/edit-add-user.component';





@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DataTableComponent,
    NewTicketComponent,
    EditTicketComponent,
    ForgetPasswordComponent,
    UserManagementComponent,
    EditAddUserComponent,
  
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

import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSortModule } from '@angular/material/sort';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { FileAttachComponent } from './file-attach/file-attach.component';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NavBarComponent } from './nav-bar/nav-bar/nav-bar.component';
import { DatePipe } from '@angular/common';
import { EditAddUserComponent } from './edit-add-user/edit-add-user.component';

export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FileAttachComponent,
    NewTicketComponent,
    EditAddUserComponent,
    NavBarComponent,
  ],
  // entryComponents: [NewTicketComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}


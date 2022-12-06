import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataTableComponent } from './data-table/data-table.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'datatable', component: DataTableComponent},
  { path: 'newticket', component: NewTicketComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, DataTableComponent, NewTicketComponent]

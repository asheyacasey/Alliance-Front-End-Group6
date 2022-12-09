import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataTableComponent } from './data-table/data-table.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UserManagementComponent } from './user-management/user-management.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'datatable', component: DataTableComponent},
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'user-management', component: UserManagementComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ LoginComponent, DataTableComponent, ForgetPasswordComponent, UserManagementComponent]

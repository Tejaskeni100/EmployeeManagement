import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginGuardGuard } from './guard/login-guard/login-guard.guard';
import { UnsavedChangesGuard } from './guard/unsaved-changes-guard/unsaved-changes.guard';
import { UserloginGuard } from './guard/user-loggedIn/userlogin.guard';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {path: '', redirectTo: '/home' ,pathMatch: 'full'}, //wildcard Route,
  {path: 'login', component: UserLoginComponent, canActivate:[UserloginGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'employeelist', component: EmployeeListComponent, canActivate: [LoginGuardGuard]},
  {path: 'addemployee', component: AddEditEmployeeComponent, canActivate: [LoginGuardGuard], canDeactivate: [UnsavedChangesGuard]},
  {path: 'editemployee/:employee_id', component: AddEditEmployeeComponent, canActivate: [LoginGuardGuard], canDeactivate: [UnsavedChangesGuard]},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

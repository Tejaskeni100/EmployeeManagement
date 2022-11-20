import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddEditEmployeeComponent } from '../../add-edit-employee/add-edit-employee.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: AddEditEmployeeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(component.employee_name.dirty || component.email_id.dirty || component.department.dirty || component.designation.dirty ){
        // component.employeeForm.reset();
        return window.confirm("You have some unsaved changes, Are you Sure you want to Navigate?");

      }
    
      return true;
  }
  
}

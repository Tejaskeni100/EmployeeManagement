import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Employee } from '../interface/employee-interface/employee';
import { EmployeeServiceService } from '../services/employee/employee-service.service';
import {Location} from '@angular/common';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {
  employee!: Employee
  id: string | null = this.route.snapshot.paramMap.get('employee_id');
  employeeForm: FormGroup;
  employee_id!: FormControl;
  employee_name!: FormControl; 
  email_id!: FormControl;
  department!: FormControl;
  designation!: FormControl;
  status!: boolean;

  matcher = new MyErrorStateMatcher();
  

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeServiceService, private fb: FormBuilder, private _location: Location) {
    this.email_id = new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.employee_name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    this.department = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
    this.designation = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);

    
    this.employee_name = new FormControl('', [Validators.required]);
    this.department = new FormControl('', [Validators.required]);
    this.designation = new FormControl('', [Validators.required]);

    this.employeeForm = this.fb.group({
      employee_name: this.employee_name,
      email_id: this.email_id,
      department: this.department,
      designation: this.designation
    })
   }

  ngOnInit(): void {
    if(this.id){
      this.employeeService.getEmployee(this.id).subscribe((data: any) => {
        // console.log(data[0]);
        if(data[0] == undefined) {
          this.router.navigate(['404']);
      }else {
        this.employee = data[0];
        this.employeeForm.patchValue(this.employee);
      }
    })
  }

    // if(this.id){
    //   this.employeeForm.controls['employee_id'].disable();
    // }
  }

  addEditForm(){
    if(!this.id){
      this.employee_id = new FormControl('', [Validators.required])

      this.employee = {
        employee_name: this.employeeForm.controls['employee_name'].value,
        email_id: this.employeeForm.controls['email_id'].value,
        department: this.employeeForm.controls['department'].value,
        designation: this.employeeForm.controls['designation'].value,
      }

      if(this.employeeForm.valid){
        
          this.employeeService.addEmployee(this.employee).subscribe(
            (data: any) => {
              if(data.sqlMessage) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.sqlMessage,
                })
                // alert(data.sqlMessage);
              }else {
                Swal.fire({
                  title: 'Employee is Added!',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1700
                });
                // alert("Employee is Added");
                this.employeeForm.reset();
                this.router.navigate(['/employeelist']);
              }
            }
            // (err) => {
            //   alert(err);
            // }
            )
          }
      } else {
        this.employee = {
          employee_id: this.id,
          employee_name: this.employeeForm.controls['employee_name'].value,
          email_id: this.employeeForm.controls['email_id'].value,
          department: this.employeeForm.controls['department'].value,
          designation: this.employeeForm.controls['designation'].value,
        }
        if(this.employeeForm.valid){

          this.employeeService.editEmployee(this.employee).subscribe(
            (data: any) => {
              if(data.sqlMessage) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.sqlMessage,
                })

                }else {
                  Swal.fire({
                    title: 'Employee is Updated!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  // alert("Employee is Updated!");
                  this.employeeForm.reset();
                  this.router.navigate(['/employeelist']);
                }
          }
          )
        }
        }
      }

  goBackEmployeeList(){
    this._location.back();
    // this.router.navigate(['employeelist'])
  }

}
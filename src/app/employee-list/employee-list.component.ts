import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../interface/employee-interface/employee';
import { EmployeeServiceService } from '../services/employee/employee-service.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import swal from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeData: Employee[] = [];
  dataSource: any
  id: string | null | number = this.route.snapshot.paramMap.get('employee_id');
  constructor(private router: Router, private route: ActivatedRoute ,private employeeService: EmployeeServiceService) { }

  displayedColumns: string[] = ['employee_id', 'employee_name', 'email_id', 'department', 'designation', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    // this.employeeService.getEmployees().subscribe((data : Employee[]) => {
    //   this.employeeData = data;
    //   this.dataSource = data;
      
    //   this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.employeeService.getEmployees().subscribe((data : Employee[]) => {
      this.employeeData = data;
      this.dataSource = data;
      
      this.dataSource = new MatTableDataSource<Employee>(this.employeeData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  getRow(row: any) {
    console.log(row);
  }

  filterChange(event: Event){
    const fillValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = fillValue;
  }

  async deleteConfirmation(eid?: string) {
 
    let result = await swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
     this.deleteProduct(eid)
     swal.fire({
      title: 'Deleted',
      text: "Employee is deleted",
      icon: 'success',
     })
     this.getEmployeeData();
    }
   }

   deleteProduct(eid?: string): void {
    console.log(eid)
    this.employeeService.deleteEmployee(eid).subscribe((data) => {
      console.log("Deleted")
    })
  
   }
  
   // deleteEmployee(id?: any): void {
  //   console.log(id);
  //   let status = window.confirm("Are you Sure? Do you want to Delete it?");
  //   if (status == true){ 
  //     this.employeeService.deleteEmployee(id).subscribe((data) => { 
  //       alert("Data Deleted");
  //       this.getEmployeeData();
  //       // window.location.reload();
  //     }) 
  //   }
  // }

}

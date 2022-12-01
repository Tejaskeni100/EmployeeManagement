import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from 'src/app/interface/employee-interface/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  Employee(employee: Employee) {
    throw new Error('Method not implemented.');
  }
  // apiServer = "http://localhost:5000/employee"
  // apiServer = 'http://172.21.102.17:5000/employee';
  apiServer = 'https://backend-tejaskeni100.onrender.com/employee';

  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient
      .get<Employee[]>(this.apiServer + `/getemployee`)
      .pipe(catchError(this.errorHandler));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient
      .post<Employee>(this.apiServer + `/addemployee`, employee)
      .pipe(catchError(this.errorHandler));
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient
      .put<Employee>(
        this.apiServer + `/editemployee/${employee.employee_id}`,
        employee
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id: any): Observable<any> {
    return this.httpClient
      .delete<any>(this.apiServer + `/deleteemployee/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getEmployee(id: any): Observable<Employee> {
    return this.httpClient
      .get<Employee>(this.apiServer + `/getemployee/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getConnection(): Observable<any> {
    return this.httpClient.get<any>("https://backend-tejaskeni100.onrender.com").pipe(
     catchError(this.errorHandler)
    )
  
    }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}

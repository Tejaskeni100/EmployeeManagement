import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from 'src/app/interface/user-interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  
  User(user: User) {
    throw new Error('Method not implemented.');
  }
  // apiServer = "http://localhost:5000/user";
  // apiServer = 'http://172.21.102.17:5000/user';
  apiServer = "https://backend-tejaskeni100.onrender.com/user";
  
  
  constructor(private httpClient: HttpClient) { }
  
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer+`/getusers`).pipe(
      catchError(this.errorHandler)
      )
    }

    
    loginUser(user : User): Observable<User> {
      return this.httpClient.post<User>(this.apiServer+`/login`, user).pipe(
        catchError(this.errorHandler)
        )
      }
      
      addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.apiServer+`/create`, user).pipe(
      catchError(this.errorHandler)
      )
    } 
    
    forgotPassword(user: any): Observable<User> {
      return this.httpClient.post<User>(this.apiServer+`/otp`, user).pipe(
        catchError(this.errorHandler)
    )
  }
  
  updatePassword(user: any): Observable<User> {
    return this.httpClient.post<User>(this.apiServer+`/update`, user).pipe(
      catchError(this.errorHandler)
      )
    }
    
    loggedIn(){
      return !!sessionStorage.getItem('token');
    }

    localLoggedIn(){
      return !!localStorage.getItem('rememberdme');
    }

    
    getToken(){
     return sessionStorage.getItem('token');
    }
    
    
    errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
     // Get client-side error
     errorMessage = error.error.message;
    } else {
     // Get server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nResponse: ${error.nResponse}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
   }
}

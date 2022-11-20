import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserloginGuard implements CanActivate {
  constructor(private routes : Router, private _location: Location){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('loginusername') == null){
        return true;
      }
      else
      {
        // alert("User is Already LoggedIn!")
        Swal.fire({
          title: 'Oops...',
          text:'User is Already LoggedIn!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500
        })
        setInterval(()=> {
          this._location.back();
        }, 1499)
        return false;
      }
  }
  
}

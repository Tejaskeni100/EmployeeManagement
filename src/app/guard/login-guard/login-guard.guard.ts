import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private routes : Router, private userService: UserServiceService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(sessionStorage.getItem('loginusername')!= null){
      //   return true;
      // }
      if(this.userService.loggedIn() || this.userService.localLoggedIn()){
        return true;
      }
      else
      {
        alert("Please Login!")
        this.routes.navigate(['/login']);
        return false;
      }
  }
  
}

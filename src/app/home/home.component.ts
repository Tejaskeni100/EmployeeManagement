import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../services/shared-service/shared-service.service';
import { UserServiceService } from '../services/user/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginUserName: any;

  constructor(private sharedService: SharedServiceService, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.sharedService.currentMessage.subscribe(data => {
      // console.log(data);
    })
    
  }
  
  loginButtonService(){
    this.sharedService.changeMessage(0);
  }

  signupButtonService(){
    this.sharedService.changeMessage(1);
  }

  loggedIn(){
    this.loginUserName = sessionStorage.getItem('loginusername');
    return this.loginUserName;

  }

}

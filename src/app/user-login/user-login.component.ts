import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user/user-service.service';

import { User } from '../interface/user-interface/user';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { SharedServiceService } from '../services/shared-service/shared-service.service';
import { CustomValidators } from '../Custom-Validators/custom-validators';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  email_id! : FormControl;
  password! : FormControl;
  name! : FormControl;
  loginForm! : FormGroup;
  otp! : FormControl;
  user!: User; 
  status: any
  selectedTabIndex: number = 0;
  show: boolean = false; 
  hide: boolean = false;
  otpStatus: boolean = false;
  confirmPassword!: FormControl;
 

  // myFunction() {
  //   document.getElementById('mySelect' = true;
  // }

  constructor(private fb: FormBuilder, private router: Router, private userService: UserServiceService, private sharedService: SharedServiceService) {
    this.email_id = new FormControl('', Validators.required);
    this.password = new FormControl('',Validators.compose([ Validators.required,
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        { hasSpecialCharacters: true }
      ),
      Validators.minLength(8)]));
      this.confirmPassword = new FormControl ('', Validators.compose([Validators.required]))
  

    this.loginForm = this.fb.group({
      name: this.name,
      email_id : this.email_id,
      password: this.password,
      otp: this.otp,
      confirmPassword: this.confirmPassword
    },
    {
      validator: CustomValidators.passwordMatchValidator
    })
  }

  ngOnInit(): void {

    this.sharedService.currentMessage.subscribe(data => {
      // console.log(data);
      this.selectedTabIndex = data; 
    })
  }

  showpassword() {
    this.show = !this.show;
  }

  loginButtonService(){
    this.sharedService.changeMessage(0);
  }

  signupButtonService(){
    this.sharedService.changeMessage(1);
  }


  tabClick(tab: any) {
    // console.log(tab);
  }

  createUser() {

    this.user = {
      name: this.loginForm.controls['name'].value,
      email_id: this.loginForm.controls['email_id'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.userService.addUser(this.user).subscribe((data: any)=> {
      // console.log(data);
      Swal.fire({
        title: 'User is Added!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1700
      });
      
      this.loginForm.reset();
      this.loginButtonService();
    })
  }

  login(){
    this.status = sessionStorage.getItem('loginusername');
    return this.status;
  }
  // login User Method
  loginUser(){
    this.user = {
      email_id: this.loginForm.controls['email_id'].value,
      password: this.loginForm.controls['password'].value
    };
    this.userService.loginUser(this.user).subscribe(
      (data: any) => {
        // console.log(data); 
        if(data.message == "Password Incorrect!"){
          Swal.fire({
            icon: 'warning',
            title: data.message,
            showConfirmButton: false, 
            timer: 2000
          })
          
        } else {
          Swal.fire({
            icon: 'success',
            title: data.message,
            showConfirmButton: false, 
            timer: 2000
          })
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('loginusername', data.name);
          localStorage.setItem('rememberdme', data.name);
          this.router.navigate(['home']);
        }
        // Without token
        // console.log(data.length);
        // if(data.length == 0){
        //   // alert("Incorrect Credential!");
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Incorrect Credential!'
        //   })
        // }else {
        //   // alert("Login Success!");
        //   Swal.fire({
        //     icon: 'success',
        //     title: 'Login Successful',
        //     showConfirmButton: false, 
        //     timer: 1700
        //   }
        //   )
        //   sessionStorage.setItem('loginusername', data[0].name);
        //   // localStorage.setItem('loginusername', data[0].name);
        //   this.router.navigate(['home']);
        // }
        

      },
      err => {
        // console.log(err)
        console.log(err.message);
        Swal.fire({
              icon: 'error',
              title: 'Incorrect Credential!'
            })
      }
        
    )
  }
    
  hideUnhide(){
    this.hide = !this.hide;
  }  

  sendOtp(){

    this.user = {
      email_id: this.loginForm.controls['email_id'].value
    };
    // console.log(this.user)
    this.userService.forgotPassword(this.user).subscribe((data: any) => {
      // console.log(data.affectedRows)
      if(data.affectedRows == 1){
        this.otpStatus = true;
        this.loginForm.get('email_id')?.disable();
        // console.log("Otp Send!")
        Swal.fire({
          title: 'Otp Send to your registerd Email ID!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1700
        });
      } else if(data.affectedRows == 0){
        Swal.fire({
          title: 'Server Error!',
          icon: 'error',
          
        });
      }
    })
  }

  forgotPassword(){
    this.user = {
      email_id: this.loginForm.controls['email_id'].value,
      otp: this.loginForm.controls['otp'].value,
      password: this.loginForm.controls['password'].value
    }
    // console.log(this.user)

    this.userService.updatePassword(this.user).subscribe(
      (data: any) => {
        // alert("Password is Updated")
        Swal.fire({
          title: 'User Password Updated!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1700
        });
        // console.log(data);
        this.loginForm.get('email_id')?.enable();
        this.loginForm.reset();
        this.hide = false;
      }
    )
  }

// Remembered Me!

  rememberedMe(){
    // console.log(localStorage.getItem('rememberdme'));
    return localStorage.getItem('rememberdme');
  }

     // login() {
  //   this.userService.getUsers().subscribe((data: any) => {
  //     console.log(Md5.init(this.loginForm.value.password));
  //     const user = data.find((a: any) => {
  //       // this.loginName = a.name;
  //       return a.email_id === this.loginForm.value.email_id && a.password === Md5.init(this.loginForm.value.password)
  //     });

  //     console.log(user);
  //     if(user){
  //       alert("Login Success!")
  //       this.router.navigate(['employeelist']);
  //     } else {
  //       alert("Incorrect Credential!")
  //     }

  //   });
  // }

    // this.employeeService.addEmployee(this.employee).subscribe(
    //   (data: any) => {
    //     alert("Employee is Added");
    //     this.router.navigate(['/employeelist']);
    //     console.log(data);
    //   }
    //   )

  // toSec() {
  //   document.getElementById("signup")?.scrollIntoView();
  // }
}

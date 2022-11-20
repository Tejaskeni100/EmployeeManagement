import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { SharedServiceService } from '../services/shared-service/shared-service.service';

declare const navbar: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginUserName: any
  navbarfixed: boolean = false;


  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 100){
      this.navbarfixed = true;
    }else {
      this.navbarfixed = false;
    }
  }
  myFun(){
    navbar();
  }

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedServiceService, @Inject(DOCUMENT) private document: Document,
  private renderer : Renderer2) {
    // this.myFun();
   }

  ngOnInit(): void {
    this.loginUserName = sessionStorage.getItem('loginusername');
    // console.log(this.loggedIn());
    this.route.fragment.subscribe((data) =>{
      // console.log(data); 
      this.jumpTo(data)
    })

  }

  loggedIn(){
    // this.loginUserName = sessionStorage.getItem('loginusername'); 
    this.loginUserName = localStorage.getItem('rememberdme');
        // this.loginUserName = sessionStorage.getItem('token'); 
    // return sessionStorage.getItem('loginDetails')
    return this.loginUserName;
  }

  loginButtonService(){
    this.sharedService.changeMessage(0);
  }

  signupButtonService(){
    this.sharedService.changeMessage(1);
  }

  // logout(){
  //   let confirmMsg = window.confirm("Are you sure want to logout?")
  //   if(confirmMsg == true){
  //     sessionStorage.clear();
      
  //     this.router.navigate(['/login']);
  //   }
  // }

  jumpTo(section: any){
    setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({behavior: 'smooth'})
    }, 1000)
  }
  
  // toggleMode() {
  //   this.document.body.classList.toggle(Mode.LIGHT);
  //   this.document.body.classList.toggle(Mode.DARK);
  //   if (this.currentMode === Mode.LIGHT) {
  //     this.updateCurrentMode(Mode.DARK);
  //   } else {
  //     this.updateCurrentMode(Mode.LIGHT);
  //   }
  // }

  logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "Once logout you need to login again!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Logout Successfully!',
          showConfirmButton: false,
          timer: 1500

        }
          )
          sessionStorage.clear();
          localStorage.clear();
          this.router.navigate(['home']);
        }
      })
    }

   
    }
    // function HostListner(arg0: string, arg1: string[]) {
      //   throw new Error('Function not implemented.');
      // }
      

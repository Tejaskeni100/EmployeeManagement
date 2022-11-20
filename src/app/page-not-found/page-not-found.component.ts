import { Component, OnInit } from '@angular/core';
import { gsap } from "gsap";
declare const myFun: any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
 callfun(){
  myFun();
 }
  constructor() { }

  ngOnInit(): void {
    this.callfun();
  }

}

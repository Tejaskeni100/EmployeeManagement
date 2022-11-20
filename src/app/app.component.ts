import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  theme: Theme = 'light-theme'

  title = 'EmployeeProject';

  constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document,
  private renderer : Renderer2){
  }
  ngOnInit(){
    this.route.fragment.subscribe((data) =>{
      console.log(data);
    })
    this.initializeTheme();
  }

  initializeTheme = (): void => this.renderer.addClass(this.document.body, this.theme)

  switchTheme() {
    this.document.body.classList.replace(this.theme, this.theme === 'light-theme' ? (this.theme = 'dark-theme') : (this.theme = 'light-theme'))
  }
}

export type Theme = 'light-theme' | 'dark-theme';
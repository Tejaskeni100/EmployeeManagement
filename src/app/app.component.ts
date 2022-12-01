import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from './services/employee/employee-service.service';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>angular-dark-mode</h1>
    <p>Toggle to see magic happens!</p>
    <app-dark-mode></app-dark-mode>
  `,
})
export class AppComponent {
  theme: Theme = 'light-theme';

  title = 'EmployeeProject';

  showLoader$ = this.loaderService.loadingAction$;

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private loaderService: LoaderService,
    private service: EmployeeServiceService
  ) {}
  ngOnInit() {
    this.service.getConnection().subscribe(data => {
      console.log(data);
    })

    this.route.fragment.subscribe((data) => {
      // console.log(data);
    });
    this.initializeTheme();
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);

  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? (this.theme = 'dark-theme')
        : (this.theme = 'light-theme')
    );
  }
}

export type Theme = 'light-theme' | 'dark-theme';

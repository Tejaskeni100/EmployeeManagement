import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  private loadingSubject = new Subject<boolean>();
  loadingAction$ = this.loadingSubject.asObservable();

  showLoader() {
    console.log("Calling ShowLoader")
    this.loadingSubject.next(true);
  }

  hideLoader() {
    console.log("Calling Hideloader")
    this.loadingSubject.next(false)
  }


}

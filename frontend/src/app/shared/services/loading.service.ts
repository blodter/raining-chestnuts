import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // This service is used to manage the loading state of the application.
  loading$ = new BehaviorSubject<boolean>(false);
  private loadingCount = 0;

  constructor() { }

  start() {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.loading$.next(true);
    }
  }

  stop() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    if (this.loadingCount === 0) {
      setTimeout(() => {
        this.loading$.next(false);
      }, 1000)
    }
  }

  reset() {
    this.loadingCount = 0;
    setTimeout(() => {
      this.loading$.next(false);
    }, 1000)
  }
}

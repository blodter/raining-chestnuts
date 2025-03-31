import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BackService {
  // This service is used to navigate back in the browser history or to a specific URL.
  constructor(
    private location: Location,
    private router: Router
  ) {}

  goBack(url?: string) {
    const locationState = this.location.getState() as any;
    if (locationState && locationState.navigationId && locationState.navigationId > 1) {
      this.location.back();
    } else {
      this.router.navigateByUrl(url ? url : '/');
    }
  }
}

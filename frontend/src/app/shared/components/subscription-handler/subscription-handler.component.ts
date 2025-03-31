import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  template: ``,
})
export class SubscriptionHandlerComponent implements OnDestroy {
  // This component is used to handle subscriptions in a clean way
  private _destroy = new Subject<void>();
  public destroy$ = this._destroy as Observable<void>;

  constructor() {}

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}

declare module 'rxjs/internal/Observable' {
  interface Observable<T> {
    dieWith(comp: SubscriptionHandlerComponent): Observable<T>;
  }
}

Observable.prototype.dieWith = function <T>(comp: SubscriptionHandlerComponent): Observable<T> {
  return this.pipe(takeUntil(comp.destroy$));
};

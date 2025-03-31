import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public baseUrl: string = '';

  constructor() {}

  buildUrl(endpoint: string | string[]): string {
    if (Array.isArray(endpoint)) {
      return this.baseUrl + endpoint.join('/');
    }
    return this.baseUrl + endpoint;
  }
}

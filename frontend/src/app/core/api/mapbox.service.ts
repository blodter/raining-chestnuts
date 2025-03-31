import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../environment/environment';

export interface MapboxSearchOptions {
  language?: string
  limit?: number
  proximity?: string
  bbox?: string
  country?: string
  types?: string
  poi_category?: string
  poi_category_exclusions?: string
  eta_type?: string
  navigation_profile?: string
  origin?: string
}

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private baseUrl = 'https://api.mapbox.com/';
  private sessionToken: string = this.getSessionToken();

  constructor(private http: HttpClient) {
  }

  getSessionToken() {
    return uuidv4();
  }

  reverseGeocode(latitude: number, longitude: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'search/geocode/v6/reverse',
      {
        params: {
          access_token: environment.mapbox.accessToken,
          latitude,
          longitude
        }
      }
    );
  }

  search(query: string, options: MapboxSearchOptions = {}): Observable<any> {
    return this.http.get(
      this.baseUrl + 'search/searchbox/v1/suggest',
      {
        params: {
          access_token: environment.mapbox.accessToken,
          q: query,
          session_token: this.sessionToken,
          ...options
        }
      }
    ).pipe(
      // On 400 error, refresh sessionToken and retry
      catchError((error) => {
        if (error.status === 400) {
          this.sessionToken = this.getSessionToken();
          return this.search(query);
        }
        return throwError(error);
      })
    );
  }

  retrieve(mapboxId: string) {
    return this.http.get(
      `${this.baseUrl}search/searchbox/v1/retrieve/${mapboxId}`,
      {
        params: {
          access_token: environment.mapbox.accessToken,
          session_token: this.sessionToken
        }
      }
    )
  }
}

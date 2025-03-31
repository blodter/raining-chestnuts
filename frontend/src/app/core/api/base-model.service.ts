import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { QueryResults } from '../models/query-results.model';
import { BaseService } from './base.service';

export const BASE_MODEL_ENDPOINT = new InjectionToken<string>('BaseModelEndpoint');


export const buildParams = (params?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (params) {
    Object.keys(params).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, params[key]);
      }
    });
    if (params.sort) {
      params.sort.forEach((val: any) => {
        options = options.append('sort', val);
      });
    }
  }
  return options;
};

@Injectable({
  providedIn: 'root',
})
export class BaseModelService<T> extends BaseService {
  override baseUrl: string = environment.backendUrl;

  constructor(
    private http: HttpClient,
    @Inject(BASE_MODEL_ENDPOINT) protected endpoint: string,
  ) {
    super();
    this.baseUrl = this.baseUrl + endpoint + '/';
  }

  filter(params_?: any): Observable<QueryResults<T>> {
    const params = buildParams(params_);
    return this.http.get<QueryResults<T>>(this.baseUrl, {params});
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(this.buildUrl(id));
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(data: any, id?: any): Observable<T> {
    id = id ? id : data.id;
    return this.http.patch<T>(this.buildUrl(id), data);
  }

  delete(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(this.buildUrl(id), {observe: 'response'});
  }

  me(): Observable<T> {
    return this.http.get<T>(this.buildUrl('me'));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NationalPark } from '../models/national-park.model';
import { BaseModelService } from './base-model.service';

@Injectable({
  providedIn: 'root',
})
export class NationalParkService extends BaseModelService<NationalPark> {
  constructor(http: HttpClient) {
    super(http, 'national-parks');
  }
}

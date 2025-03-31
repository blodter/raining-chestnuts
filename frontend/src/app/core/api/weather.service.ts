import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from '../models/weather.model';
import { BaseModelService } from './base-model.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService extends BaseModelService<Weather> {
  constructor(http: HttpClient) {
    super(http, 'weather');
  }
}

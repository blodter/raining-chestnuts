import { BaseWeather } from './base-weather.model';
import { BaseModel } from './base.model';

export class NationalPark extends BaseModel {
  latitude: number;
  longitude: number;
  name: string;
  region: string;
  weather: BaseWeather

  constructor(data: any) {
    super(data);
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.name = data.name;
    this.region = data.region;
    this.weather = new BaseWeather(data.weather);
  }
}

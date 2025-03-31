import { BaseModel } from './base.model';
import { NationalPark } from './national-park.model';

export class Weather extends BaseModel {
  change_today_to_10: number;
  change_10_to_20: number;
  change_20_to_30: number;
  current_temperature: number;
  historical_mean_temp_10: number;
  historical_mean_temp_20: number;
  historical_mean_temp_30: number;
  mean_daily_temperature: number;
  national_park: NationalPark;

  constructor(data: any) {
    super(data)
    this.change_today_to_10 = data.change_today_to_10;
    this.change_10_to_20 = data.change_10_to_20;
    this.change_20_to_30 = data.change_20_to_30;
    this.current_temperature = data.current_temperature;
    this.historical_mean_temp_10 = data.historical_mean_temp_10;
    this.historical_mean_temp_20 = data.historical_mean_temp_20;
    this.historical_mean_temp_30 = data.historical_mean_temp_30;
    this.mean_daily_temperature = data.mean_daily_temperature;
    this.national_park = new NationalPark(data.national_park);
  }
}

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { DefaultGridColumnsDirective, DefaultGridGapDirective, DefaultGridRowsDirective } from 'ng-flex-layout';
import { WeatherService } from '../../core/api/weather.service';
import { GAPS } from '../../core/constants/layout.constants';
import { QueryResults } from '../../core/models/query-results.model';
import { Weather } from '../../core/models/weather.model';
import {
  SubscriptionHandlerComponent
} from '../../shared/components/subscription-handler/subscription-handler.component';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

interface AverageRatesOfChange {
  meanDaily: number;
  mean10: number;
  mean20: number;
  mean30: number;
  rateOfChange10: number;
  rateOfChange20: number;
  rateOfChange30: number;
}

interface RegionalAverages {
  southern: AverageRatesOfChange;
  western: AverageRatesOfChange;
  eastern: AverageRatesOfChange;
}

interface RegionalWeather {
  southern: Weather[];
  western: Weather[];
  eastern: Weather[];
}

@Component({
  imports: [
    DefaultGridGapDirective,
    DefaultGridRowsDirective,
    MatTableModule,
    MatCardModule,
    TemperaturePipe,
    DefaultGridColumnsDirective,
    MatTooltip,
    NgClass,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent extends SubscriptionHandlerComponent {
  // Properties
  weather?: Weather[];
  totalAverages: AverageRatesOfChange = {
    meanDaily: 0,
    mean10: 0,
    mean20: 0,
    mean30: 0,
    rateOfChange10: 0,
    rateOfChange20: 0,
    rateOfChange30: 0
  }
  regionalAverages: RegionalAverages = {
    southern: {
      meanDaily: 0,
      mean10: 0,
      mean20: 0,
      mean30: 0,
      rateOfChange10: 0,
      rateOfChange20: 0,
      rateOfChange30: 0
    },
    western: {
      meanDaily: 0,
      mean10: 0,
      mean20: 0,
      mean30: 0,
      rateOfChange10: 0,
      rateOfChange20: 0,
      rateOfChange30: 0
    },
    eastern: {
      meanDaily: 0,
      mean10: 0,
      mean20: 0,
      mean30: 0,
      rateOfChange10: 0,
      rateOfChange20: 0,
      rateOfChange30: 0
    }
  }
  displayedColumns: string[] = ['nationalPark', 'currentTemperature', 'meanDaily', 'mean10', 'mean20', 'mean30'];

  // Constants
  protected readonly GAPS = GAPS;

  constructor(
    private router: Router,
    private weatherService: WeatherService,
  ) {
    super();
    // Load weather data and calculate averages
    let regionalWeather: RegionalWeather = {
      southern: [],
      western: [],
      eastern: []
    };
    this.weatherService.filter().dieWith(this).subscribe({
      next: (response: QueryResults<Weather>) => {
        this.weather = response.results;

        // Calculate averages
        const totals = {
          meanDaily: 0,
          mean10: 0,
          mean20: 0,
          mean30: 0
        };
        const regions = {
          southern: { meanDaily: 0, mean10: 0, mean20: 0, mean30: 0 },
          western: { meanDaily: 0, mean10: 0, mean20: 0, mean30: 0 },
          eastern: { meanDaily: 0, mean10: 0, mean20: 0, mean30: 0 }
        }
        this.weather.forEach((weather: Weather) => {
          // Calculate totals
          totals.meanDaily += weather.mean_daily_temperature;
          totals.mean10 += weather.historical_mean_temp_10;
          totals.mean20 += weather.historical_mean_temp_20;
          totals.mean30 += weather.historical_mean_temp_30;

          // Calculate regional
          switch (weather.national_park.region) {
            case 'Southern':
              regionalWeather.southern.push(weather);
              regions.southern.meanDaily += weather.mean_daily_temperature;
              regions.southern.mean10 += weather.historical_mean_temp_10;
              regions.southern.mean20 += weather.historical_mean_temp_20;
              regions.southern.mean30 += weather.historical_mean_temp_30;
              break;
            case 'Western':
              regionalWeather.western.push(weather);
              regions.western.meanDaily += weather.mean_daily_temperature;
              regions.western.mean10 += weather.historical_mean_temp_10;
              regions.western.mean20 += weather.historical_mean_temp_20;
              regions.western.mean30 += weather.historical_mean_temp_30;
              break;
            case 'Eastern':
              regionalWeather.eastern.push(weather);
              regions.eastern.meanDaily += weather.mean_daily_temperature;
              regions.eastern.mean10 += weather.historical_mean_temp_10;
              regions.eastern.mean20 += weather.historical_mean_temp_20;
              regions.eastern.mean30 += weather.historical_mean_temp_30;
              break;
          }
        });

        // Calculate total averages
        this.calculateAverages(this.totalAverages, totals, this.weather);
        this.calculateAverages(this.regionalAverages.southern, regions.southern, regionalWeather.southern);
        this.calculateAverages(this.regionalAverages.western, regions.western, regionalWeather.western);
        this.calculateAverages(this.regionalAverages.eastern, regions.eastern, regionalWeather.eastern);
      },
      error: (error) => {
        console.error('Error fetching weather:', error);
      }
    });
  }

  calculateAverages(averages: AverageRatesOfChange, totals: any, weather: Weather[]) {
    // Reusable function to calculate averages
    averages.meanDaily = totals.meanDaily / weather.length;
    averages.mean10 = totals.mean10 / weather.length;
    averages.mean20 = totals.mean20 / weather.length;
    averages.mean30 = totals.mean30 / weather.length;
    averages.rateOfChange10 = 0;
    averages.rateOfChange20 = 0;
    averages.rateOfChange30 = 0;

    averages.rateOfChange10 = averages.meanDaily - averages.mean10;
    averages.rateOfChange20 = averages.mean10 - averages.mean20;
    averages.rateOfChange30 = averages.mean20 - averages.mean30;
  }

  navigateToWeatherDetails(weather: Weather) {
    // Navigate to the weather details page for the selected national park
    this.router.navigate(['weather', weather.national_park.id]);
  }
}

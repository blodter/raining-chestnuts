import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { WeatherComponent } from './weather/weather.component';

export const placesRoutes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    pathMatch: 'full'
  },
  {
    path: 'weather/:id',
    component: WeatherDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: MapComponent,
    pathMatch: 'full'
  },
];

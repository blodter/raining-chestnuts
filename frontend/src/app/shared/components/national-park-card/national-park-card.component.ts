import { DecimalPipe } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NationalPark } from '../../../core/models/national-park.model';
import { TemperaturePipe } from '../../pipes/temperature.pipe';

@Component({
  selector: 'app-national-park-card',
  imports: [
    MatCardModule,
    DecimalPipe,
    TemperaturePipe,
    MatButton,
  ],
  templateUrl: './national-park-card.component.html',
  styleUrl: './national-park-card.component.scss'
})
export class NationalParkCardComponent {
  @Input() nationalPark?: NationalPark
  isPopup = false;

  onSeeOnMap = output<NationalPark | undefined>();
  onViewWeather = output<NationalPark | undefined>();

  constructor() {}

  onSeeOnMapClick() {
    this.onSeeOnMap.emit(this.nationalPark);
  }

  onViewWeatherClick() {
    this.onViewWeather.emit(this.nationalPark);
  }
}

import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DefaultGridColumnsDirective, DefaultGridGapDirective, DefaultGridRowsDirective } from 'ng-flex-layout';
import { NationalParkService } from '../../core/api/national-park.service';
import { GAPS } from '../../core/constants/layout.constants';
import { NationalPark } from '../../core/models/national-park.model';
import { BackButtonComponent } from '../../shared/components/back-button/back-button.component';
import {
  SubscriptionHandlerComponent
} from '../../shared/components/subscription-handler/subscription-handler.component';
import { TemperaturePipe } from '../../shared/pipes/temperature.pipe';

@Component({
  imports: [
    DefaultGridColumnsDirective,
    DefaultGridGapDirective,
    DefaultGridRowsDirective,
    FontAwesomeModule,
    MatTableModule,
    MatCardModule,
    DecimalPipe,
    BackButtonComponent,
    TemperaturePipe,
    DatePipe,
    MatTooltip,
    NgClass,
  ],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.scss'
})
export class WeatherDetailsComponent extends SubscriptionHandlerComponent {
  // Properties
  nationalPark?: NationalPark;

  // Constants
  protected readonly GAPS = GAPS;

  constructor(
    private nationalParkService: NationalParkService,
    private route: ActivatedRoute
  ) {
    super();
    // Fetch national park details based on the route parameter
    this.route.params.dieWith(this).subscribe(params => {
      const id = params['id'];
      if (id) {
        this.nationalParkService.get(id).dieWith(this).subscribe({
          next: (response) => {
            this.nationalPark = response;
          },
          error: (error) => {
            console.error('Error fetching national park:', error);
          }
        });
      }
    });
  }
}

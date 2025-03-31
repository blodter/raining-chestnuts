import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  decimalPipe = new DecimalPipe('en-US');

  constructor() {}

  transform(
    value?: number,
  ): string | null {
    // Transforms value to a string with one decimal place and appends '°C'
    if (value === null || value === undefined) {
      return '';
    }
    return `${this.decimalPipe.transform(value, '1.1-1')}°C`;
  }
}

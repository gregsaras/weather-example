import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const unit = args[0];
    return unit === 'i' ? `${value}F` : `${((value - 32) / 1.8).toFixed(2)}C`;
  }

}

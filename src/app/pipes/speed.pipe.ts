import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed'
})
export class SpeedPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const unit = args[0];
    return unit === 'i' ? `${value}mp/h` : `${(value * 1.609344).toFixed(2)}km/h`;
  }

}

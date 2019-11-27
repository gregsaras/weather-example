import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cloudy'
})
export class CloudPercentageToStringPipe implements PipeTransform {

  // I wasn't sure what the various percentages should be called
  transform(value: any, ...args: any[]): string {
    if (value <= 10) {
      return 'Sky is clear';
    }

    if (value > 10 && value <= 50) {
      return 'Broken clouds';
    }

    if (value > 50 && value <= 90) {
      return 'Cloudy';
    }

    if (value > 90) {
      return 'Sky is covered';
    }

    return 'Data unavailable';
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RootObject } from '../describe/weather';
import { WeatherTableData } from '../describe/weather-table-data';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  private cityData$: Observable<any> | null;

  /**
   * Returns an array of city names, country codes, and their city code.
   * This implements a very simple caching mechanism where only the first request will
   * actually load the data. We can rely on this since this is a one time load.
   */
  getCityData(): Observable<any[]> {
    if (!this.cityData$) {
      this.cityData$ = this.http.get('assets/data/city.json').pipe(shareReplay(1));
    }
    return this.cityData$;
  }

  /**
   * Returns response from open weather.
   * We'll get them in imperial units and only worry about the conversion to metric
   * @param cityId id of the city you are retrieving data from
   */
  getDataForCity(cityId: string): Observable<object> {
    const openUrl = [environment.openWeatherUrl, 'data', '2.5', 'weather'].join('/');
    return this.http.get(openUrl, {
      params: {
        id: cityId,
        appid: environment.openWeatherKey,
        units: 'imperial',
      }
    });
  }

  /**
   * Converts a weather api response to a table object. This makes sorting much easier on the table
   * @param source the root object that represents a openweather api response
   */
  rootToTable(source: RootObject): WeatherTableData {
    return {
      city: source.name,
      country: source.sys.country,
      temperature: source.main.temp,
      windSpeed: source.wind.speed,
      sunrise: source.sys.sunrise,
      sunset: source.sys.sunset,
      cloudyness: source.clouds.all,
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatTable, MatTableDataSource, MatSort } from '@angular/material';

import { mergeMap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import { RootObject } from 'src/app/describe/weather';
import { WeatherTableData } from 'src/app/describe/weather-table-data';
import { of } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {

  @ViewChild(MatTable, null) table: MatTable<any>;
  @ViewChild(MatSort, null) sort: MatSort;

  constructor(private fb: FormBuilder, private ws: WeatherService) { }

  // #region forms
  weatherForm = this.fb.group({
    city: this.fb.control('', [Validators.required]),
    country: this.fb.control('', [Validators.required]),
  });

  unitForm = this.fb.group({
    units: this.fb.control('i')
  });

  // #endregion

  private citiesToDisplay: WeatherTableData[] = [];
  columnsToDisplay = ['city', 'country', 'temperature', 'windSpeed', 'cloudyness', 'sunrise', 'sunset'];
  tableDataSource = new MatTableDataSource([]);

  // #region ui helpers
  loading = false;
  searchError = false;
  apiError = false;
  // #endregion


  ngOnInit() {
    this.onChanges();
  }

  onChanges(): void {
    this.unitForm.valueChanges.subscribe(() => {
      this.table.renderRows();
    });
  }

  /**
   * This function will handle the retrieval of weather information.
   * @param form the weather form being submitted.
   */

  getWeatherForCity(e: Event, form: FormGroup) {
    e.preventDefault();
    form.disable();
    this.loading = true;

    this.ws.getCityData().pipe(mergeMap(cityList => {
      const cityMatch = cityList.find(city => {
        const foundCity = city.name.toLowerCase() === form.value.city.toLowerCase();
        const foundCountry = city.country.toLowerCase() === form.value.country.toLowerCase();
        return foundCity && foundCountry;
      });

      if (!cityMatch) {
        this.searchError = true;
        // noop
        return of(null);
      }
      this.searchError = false;

      return this.ws.getDataForCity(cityMatch.id);
    })).subscribe((city: RootObject | null) => {
      if (city) {
        const tableEntry = this.ws.rootToTable(city);
        this.citiesToDisplay.push(tableEntry);
        // To get information dynamically fed to the material table, I had to create a new source each time it changed.
        // This also meant setting the header sort each time.
        this.tableDataSource = new MatTableDataSource([...this.citiesToDisplay]);
        this.tableDataSource.sort = this.sort;
        this.table.renderRows();
        form.reset();
        this.searchError = false;
      }
      form.enable();
      this.loading = false;
    },
      err => {
        this.apiError = true;
        form.enable();
        this.loading = false;
      });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatProgressBarModule,
} from '@angular/material';
import { WeatherComponent } from './weather.component';
import { TemperaturePipe } from 'src/app/pipes/temperature.pipe';
import { SpeedPipe } from '../../pipes/speed.pipe';
import { CloudPercentageToStringPipe } from '../../pipes/cloud-percentage-to-string.pipe';

@NgModule({
  declarations: [WeatherComponent, TemperaturePipe, SpeedPipe, CloudPercentageToStringPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  exports: [WeatherComponent]
})
export class WeatherModule { }

import { Component, Input } from '@angular/core';
import type { Flight, FlightComplete } from '../../../types';

@Component({
  selector: 'app-adminform',
  templateUrl: './adminform.component.html',
  styleUrl: './adminform.component.css'
})
export class AdmformComponent {
  flight: Flight = {} as FlightComplete;
  @Input() flightIsEditing: FlightComplete = {} as FlightComplete;

  isEditing: boolean = false;

}

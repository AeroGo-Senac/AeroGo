import { Component, Input } from '@angular/core';
import type { Flight, FlightComplete } from '../../../types';
import { FormControl, ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-adminform',
  templateUrl: './adminform.component.html',
  styleUrl: './adminform.component.css',
  imports: [InputAutocompleteComponent],
})
export class AdmformComponent {
  flight: Flight = {} as FlightComplete;
  @Input() flightIsEditing: FlightComplete = {} as FlightComplete;
  @Input() airports: { id: string, text: string }[] = [];

  isEditing: boolean = false;
  isValidDestinationAirport: boolean = false;
  isValidOriginAirport: boolean = false;
  showSuggestions = false;
}

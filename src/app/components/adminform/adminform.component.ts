import { Component, Input } from '@angular/core';
import type { Flight, FlightComplete } from '../../../types';
import { FormControl, FormsModule, ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';

@Component({
  selector: 'app-adminform',
  templateUrl: './adminform.component.html',
  styleUrl: './adminform.component.css',
  imports: [InputAutocompleteComponent, FormsModule],
})
export class AdmformComponent {
  flight: Flight = {} as FlightComplete;
  @Input() flightIsEditing: FlightComplete = {} as FlightComplete;
  newFlight: FlightComplete = {} as FlightComplete;
  @Input() airports: { id: string, text: string }[] = [];
  @Input() aircrafts: { id: string, text: string }[] = [];
  ngOnInit() {
    console.log(this.airports);
  }

  onSubmit() {
    console.log(this.newFlight);
  }


  isEditing: boolean = false;
  isValidDestinationAirport: boolean = false;
  isValidOriginAirport: boolean = false;
  showSuggestions = false;
}

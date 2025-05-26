import { Component, Input } from '@angular/core';
import type { Flight, FlightComplete } from '../../../types';
import { FormControl, FormsModule, ReactiveFormsModule, type AbstractControl } from '@angular/forms';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';
import { FlightService } from '../../core/services/flights.service';

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

  constructor(private flighService: FlightService) { }

  ngOnInit() {
    console.log(this.airports);
  }
  seatTypes = [
    { value: 'executive', label: 'Executiva' },
    { value: 'economic', label: 'Econômica' },
    { value: 'premium', label: 'Premium' }
  ];

  onSubmitEdit() {
    console.log('Submitting flight edit:', this.flightIsEditing);
    this.flighService.putFlight(this.flightIsEditing).subscribe({
      next: (response) => {
        console.log('Flight updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating flight:', error);
      }
    })
  }

  addClassEditingFlight() {
    this.flightIsEditing.seat_classes = [...this.flightIsEditing.seat_classes, { id: '', flight_id: this.flightIsEditing.id, type: 'economic', available_seats: 0, price: 0, created_at: new Date, updated_at: new Date }];
  }

  removeClassEditingFlight(index: number) {
    this.flightIsEditing.seat_classes = this.flightIsEditing.seat_classes.filter((_, i) => i !== index);
  }

  addPackageEditingFlight() {
    this.flightIsEditing.packages = [...this.flightIsEditing.packages, { id: '', created_at: new Date, updated_at: new Date, flight_id: this.flightIsEditing.id, name: `New Package`, description: '', price: 0 }];
  }

  removePackageEditingFlight(index: number) {
    this.flightIsEditing.packages = this.flightIsEditing.packages.filter((_, i) => i !== index);
  }


  isEditing: boolean = false;
  isValidDestinationAirport: boolean = false;
  isValidOriginAirport: boolean = false;
  showSuggestions = false;
}

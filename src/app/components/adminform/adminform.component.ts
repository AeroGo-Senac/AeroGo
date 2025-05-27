import { Component, Input } from '@angular/core';
import type { Aircraft, Airport, Flight, FlightComplete } from '../../../types';
import { FormControl, FormsModule } from '@angular/forms';
import { InputAutocompleteComponent } from '../input-autocomplete/input-autocomplete.component';
import { FlightService } from '../../core/services/flights.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-adminform',
  templateUrl: './adminform.component.html',
  styleUrl: './adminform.component.css',
  imports: [InputAutocompleteComponent, FormsModule],
})

export class AdmformComponent {
  flight: Flight = {} as FlightComplete;
  @Input() flightIsEditing: FlightComplete = {} as FlightComplete;
  newFlight: FlightComplete = {
    id: crypto.randomUUID(),
    flight_number: this.generateFlightNumber(),
    origin_airport_id: '',
    destination_airport_id: '',
    departure_date: '',
    departure_time: '',
    arrival_date: '',
    arrival_time: '',
    aircraft_id: '',
    created_at: new Date(),
    updated_at: new Date(),
    origin_airport: {} as Airport,
    destination_airport: {} as Airport,
    aircraft: {} as Aircraft,
    seat_classes: [],
    packages: []
  } as FlightComplete;

  private generateFlightNumber(): string {
    const airlineCodes = [
      'AA', 'DL', 'UA', 'LH', 'AF', 'BA', 'EK', 'QR', 'TK', 'KL',
      'SQ', 'NH', 'JL', 'AC', 'IB', 'AM', 'QF', 'LA', 'AD', 'ET'
    ];
    const randomAirline = airlineCodes[Math.floor(Math.random() * airlineCodes.length)];
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${randomAirline}${randomNumber}`;
  }

  @Input() airports: { id: string, text: string }[] = [];
  @Input() aircrafts: { id: string, text: string }[] = [];

  constructor(private flighService: FlightService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    console.log(this.newFlight.id)
  }
  seatTypes = [
    { value: 'executive', label: 'Executiva' },
    { value: 'economic', label: 'Econômica' },
    { value: 'premium', label: 'Premium' }
  ];



  onSubmitEdit() {
    console.log('Submitting flight edit:', this.flightIsEditing);
    try {
      this.flighService.putFlight(this.flightIsEditing).subscribe({
        next: () => {
          this.toastr.success('Voo alterado com sucesso!! ', 'Success')
          this.router.navigate(['/admin']);
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        this.toastr.error(error.message, 'Error');
      } else {
        this.toastr.error('An unexpected error occurred.', 'Error');
      }
    }
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

  addClassNewFlight() {
    this.newFlight.seat_classes = [...this.newFlight.seat_classes, { id: '', flight_id: this.newFlight.id, type: 'economic', available_seats: 0, price: 0, created_at: new Date, updated_at: new Date }];
  }

  removeClassNewFlight(index: number) {
    this.newFlight.seat_classes = this.newFlight.seat_classes.filter((_, i) => i !== index);
  }

  addPackageNewFlight() {
    this.newFlight.packages = [...this.newFlight.packages, { id: '', created_at: new Date, updated_at: new Date, flight_id: this.newFlight.id, name: `New Package`, description: '', price: 0 }];
  }

  removePackageNewFlight(index: number) {
    this.newFlight.packages = this.newFlight.packages.filter((_, i) => i !== index);
  }

  onSubmitNewFlight() {
    console.log('Submitting new flight:', this.newFlight);

    try {
      this.flighService.postFlight(this.newFlight).subscribe({
        next: (response) => {
          this.toastr.success('Flight created successfully!', 'Success');
          console.log('Flight created successfully:', response);
          window.location.href = '/admin';
        },
        error: (error) => {
          this.toastr.error(error.message, 'Error');
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        this.toastr.error(error.message, 'Error');
      } else {
        this.toastr.error('An unexpected error occurred.', 'Error');
      }
    }
  }

  isEditing: boolean = false;
  isValidDestinationAirport: boolean = false;
  isValidOriginAirport: boolean = false;
  showSuggestions = false;
}

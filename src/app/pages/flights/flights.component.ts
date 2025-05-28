import { Component } from '@angular/core';
import { FlightCardComponent } from "../../components/flight-card/flight-card.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FilterComponent } from '../../components/filter/filter.component';
import { FlightService } from '../../core/services/flights.service';
import type { FlightComplete } from '../../../types';

@Component({
  selector: 'app-flights',
  imports: [FlightCardComponent, HeaderComponent, FilterComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent {

  flights: FlightComplete[] = [];
  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        this.flights = flights;
      }
    });
  }
}

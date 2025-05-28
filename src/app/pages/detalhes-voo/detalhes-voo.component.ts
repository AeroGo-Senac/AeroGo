import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../core/services/flights.service';
import type { FlightComplete } from '../../../types';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhes-voo',
  templateUrl: './detalhes-voo.component.html',
  styleUrl: './detalhes-voo.component.css',
  imports: [HeaderComponent]
})
export class DetalhesVooComponent implements OnInit {
  flight?: FlightComplete;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private router: Router
  ) { }

  goToPayment(seatType: string) {
    if (this.flight) {
      this.router.navigate(['/payment', this.flight.flight_number], { queryParams: { seat: seatType } });
    }
  }

  calcularDuracaoVoo(): string {
    const departureDate = new Date(this.flight?.departure_date + 'T' + this.flight?.departure_time);
    const arrivalDate = new Date(this.flight?.arrival_date + 'T' + this.flight?.arrival_time);
    const duration = new Date(arrivalDate.getTime() - departureDate.getTime());

    const hours = duration.getUTCHours();
    const minutes = duration.getUTCMinutes();

    return `${hours}h ${minutes}m`;
  }


  ngOnInit() {
    const flightNumber = this.route.snapshot.paramMap.get('flight_number');
    if (flightNumber) {
      this.flightService.getFlightById(flightNumber).subscribe(flights => {
        this.flight = flights[0]; // Supondo que só vem um resultado
      });
    }
  }
}
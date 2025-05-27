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
  ) {}

  goToPayment(seatType: string) {
    if (this.flight) {
      this.router.navigate(['/payment', this.flight.flight_number], { queryParams: { seat: seatType } });
    }
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
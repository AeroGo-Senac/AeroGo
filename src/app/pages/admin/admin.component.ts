import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component"
import { AdminlistComponent } from '../../components/adminlist/adminlist.component';
import { AdmformComponent } from "../../components/adminform/adminform.component";
import { FlightService } from '../../core/services/flights.service';
import type { FlightComplete } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { AirportService } from '../../core/services/airport.service';
import { AircraftService } from '../../core/services/aircraft.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [HeaderComponent, AdminlistComponent, AdmformComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private flighService: FlightService, private route: ActivatedRoute, private router: Router, private airportService: AirportService, private aircraftService: AircraftService) { }
  flights: FlightComplete[] = [];
  flighToEdit: FlightComplete = {} as FlightComplete;
  airports: { id: string, text: string }[] = [];
  aircrafts: { id: string, text: string }[] = [];
  currentUser = localStorage.getItem('currentUser')
  ngOnInit() {
    if (!this.currentUser) {
      this.router.navigate(['/login'])
    }
    this.flighService.getAllFlights().subscribe((flights) => {
      console.log(flights);
      this.flights = flights;
    });

    this.aircraftService.getAllAircraft().subscribe((aircrafts) => {
      this.aircrafts = aircrafts;
      console.log(this.aircrafts);
    });

    this.airportService.getBaseAirports().subscribe((airports) => {
      this.airports = airports;
      console.log(this.airports);
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.flighService.getFlightById(id).subscribe((flight) => {
        this.flighToEdit = flight[0];
        console.log(this.flighToEdit);
        this.mostrarFormulario();
      }
      );
    }
  }




  modoFormulario: boolean = false;

  mostrarFormulario() {
    this.modoFormulario = true;
  }

  mostrarLista() {
    this.modoFormulario = false;
    this.router.navigate(['/admin'], { relativeTo: this.route });
  }

  detalhesVoo(id: string) {
    this.flighService.getFlightById(id).subscribe((flight) => {
      console.log(flight);
    });
  }
}

import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import type { Aircraft, Airport, Flight, FlightComplete, Package, SeatClass } from '../../../types';


@Injectable({
  providedIn: 'root'

})

export class FlightService {

  private readonly apiUrl = 'http://localhost:3000/flights';
  constructor(private http: HttpClient) { }



  getAllFlights(): Observable<FlightComplete[]> {
    const flights = this.http.get<Flight[]>(this.apiUrl);

    return flights.pipe(
      switchMap((flights: Flight[]) => {
        const flightRequests = flights.map((flight: Flight) => {
          const originAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.origin_airport_id}`);
          const destinationAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.destination_airport_id}`);
          const aircraft$ = this.http.get<Aircraft[]>(`http://localhost:3000/aircraft?id=${flight.aircraft_id}`);
          const class$ = this.http.get<SeatClass[]>(`http://localhost:3000/seat_classes?flight_id=${flight.id}`);
          const packages$ = this.http.get<Package[]>(`http://localhost:3000/packages?flight_id=${flight.id}`);

          return forkJoin([originAirport$, destinationAirport$, aircraft$, class$, packages$]).pipe(
            map(([originAirport, destinationAirport, aircraft, seatClasses, packages]) => ({
              ...flight,
              origin_airport: originAirport,
              destination_airport: destinationAirport,
              aircraft: aircraft,
              seat_classes: seatClasses,
              packages: packages
            }))
          );
        });

        return forkJoin(flightRequests);
      })
    );
  }
  getFlightById(flightNumber: string): Observable<FlightComplete[]> {
    const flights = this.http.get<Flight[]>(this.apiUrl + '?flight_number=' + flightNumber);

    return flights.pipe(
      switchMap((flights: Flight[]) => {
        const flightRequests = flights.map((flight: Flight) => {
          const originAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.origin_airport_id}`);
          const destinationAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.destination_airport_id}`);
          const aircraft$ = this.http.get<Aircraft[]>(`http://localhost:3000/aircraft?id=${flight.aircraft_id}`);
          const class$ = this.http.get<SeatClass[]>(`http://localhost:3000/seat_classes?flight_id=${flight.id}`);
          const packages$ = this.http.get<Package[]>(`http://localhost:3000/packages?flight_id=${flight.id}`);

          return forkJoin([originAirport$, destinationAirport$, aircraft$, class$, packages$]).pipe(
            map(([originAirport, destinationAirport, aircraft, seatClasses, packages]) => ({
              ...flight,
              origin_airport: originAirport,
              destination_airport: destinationAirport,
              aircraft: aircraft,
              seat_classes: seatClasses,
              packages: packages
            }))
          );
        });

        return forkJoin(flightRequests);
      })
    );
  }







}
import { Injectable } from '@angular/core';
import { forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
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
          const originAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.origin_airport_id}`).pipe(
            map(airports => airports[0])
          );
          const destinationAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.destination_airport_id}`).pipe(
            map(airports => airports[0])
          );
          const aircraft$ = this.http.get<Aircraft[]>(`http://localhost:3000/aircraft?id=${flight.aircraft_id}`).pipe(
            map(aircrafts => aircrafts[0])
          );
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
          const originAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.origin_airport_id}`).pipe(
            map(airports => airports[0])
          );
          const destinationAirport$ = this.http.get<Airport[]>(`http://localhost:3000/airports?id=${flight.destination_airport_id}`).pipe(
            map(airports => airports[0])
          );
          const aircraft$ = this.http.get<Aircraft[]>(`http://localhost:3000/aircraft?id=${flight.aircraft_id}`).pipe(
            map(aircrafts => aircrafts[0])
          );
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

  putFlight(flight: FlightComplete): Observable<Flight> {
    const flightId = flight.id;
    const url = `${this.apiUrl}/${flightId}`;

    return this.http.put<Flight>(url, flight).pipe(
      switchMap((updatedFlight: Flight) => {
        const seatClassesUrl = `http://localhost:3000/seat_classes`;
        return this.http.get<SeatClass[]>(`${seatClassesUrl}?flight_id=${flight.id}`).pipe(
          switchMap((seatClasses: SeatClass[]) => {
            const deleteSeatClassRequests = seatClasses.map(seatClass =>
              this.http.delete(`${seatClassesUrl}/${seatClass.id}`)
            );
            const deleteSeatClasses$ = deleteSeatClassRequests.length > 0 ? forkJoin(deleteSeatClassRequests) : of([]);

            return deleteSeatClasses$.pipe(
              switchMap(() => {
                const newSeatClasses = flight.seat_classes || [];
                const createSeatClassRequests = newSeatClasses.map(seatClass =>
                  this.http.post<SeatClass>('http://localhost:3000/seat_classes', {
                    ...seatClass,
                    id: crypto.randomUUID(),
                    flight_id: flight.id
                  })
                );
                const createSeatClasses$ = createSeatClassRequests.length > 0 ? forkJoin(createSeatClassRequests) : of([]);

                return createSeatClasses$.pipe(
                  switchMap(() => {
                    const packagesUrl = `http://localhost:3000/packages`;
                    return this.http.get<Package[]>(`${packagesUrl}?flight_id=${flight.id}`).pipe(
                      switchMap((packages: Package[]) => {
                        const deletePackageRequests = packages.map(pkg =>
                          this.http.delete(`${packagesUrl}/${pkg.id}`)
                        );
                        const deletePackages$ = deletePackageRequests.length > 0 ? forkJoin(deletePackageRequests) : of([]);

                        return deletePackages$.pipe(
                          switchMap(() => {
                            const newPackages = flight.packages || [];
                            const createPackageRequests = newPackages.map(pkg =>
                              this.http.post<Package>('http://localhost:3000/packages', {
                                ...pkg,
                                id: crypto.randomUUID(),
                                flight_id: flight.id
                              })
                            );
                            const createPackages$ = createPackageRequests.length > 0 ? forkJoin(createPackageRequests) : of([]);

                            return createPackages$.pipe(
                              map(() => updatedFlight)
                            );
                          })
                        );
                      })
                    );
                  })
                );
              })
            );
          })
        );
      })
    );
  }






}

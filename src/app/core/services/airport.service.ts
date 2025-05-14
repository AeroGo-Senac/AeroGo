import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import type { Airport } from "../../../types";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class AirportService {
  private readonly apiUrl = "http://localhost:3000/airports";
  constructor(private http: HttpClient) { }

  getBaseAirports(): Observable<{ id: string, text: string }[]> {
    return this.http.get<Airport[]>(this.apiUrl).pipe(
      map((airports) => airports.map((airport) => ({ id: airport.id, text: airport.name + " - " + airport.code })))
    );
  }
}
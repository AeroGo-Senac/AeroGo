import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import type { Aircraft, Airport } from "../../../types";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})

export class AircraftService {
  private readonly apiUrl = "http://localhost:3000/aircraft";
  constructor(private http: HttpClient) { }

  getAllAircraft(): Observable<{ id: string, text: string }[]> {
    return this.http.get<Aircraft[]>(this.apiUrl).pipe(
      map((aircrafts) => aircrafts.map((aircraft) => ({ id: aircraft.id, text: aircraft.model })))
    );
  }
}
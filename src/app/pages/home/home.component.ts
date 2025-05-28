import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FlightService } from '../../core/services/flights.service';
import type { FlightComplete, SeatClass } from '../../../types';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private flightService: FlightService) { }
  somenteIda: string = '1';

  flights: FlightComplete[] = [];


  onChangeIda(event: Event) {
    const input = event.target as HTMLInputElement;
    this.somenteIda = input.value;
  }

  async ngOnInit() {
    this.flightService.getAllFlights().subscribe(async flights => {
      this.flights = flights;
      this.flights = await Promise.all(
        flights.map(async flight => {
          const imgURL = await this.getRandonImage(flight.destination_airport.city);
          return { ...flight, imgURL };
        })
      );
    });
  }


  obterVooMaisBarato(seat_classes: SeatClass[]): number {
    return Math.min(...seat_classes.map(seatClass => seatClass.price));
  }

  async getRandonImage(city: string): Promise<string | undefined> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout

    const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city)}&per_page=10&client_id=VMfBvznERkLbhaJ1PSPhQyvmnF10cu_FDPBhoHFa9bo`;

    try {
      const response = await fetch(apiUrl, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) {
        console.warn(`Unsplash API error: ${response.status}`);
        return undefined;
      }

      const data = await response.json();

      if (Array.isArray(data.results) && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        return data.results[randomIndex]?.urls?.small;
      }
    } catch (error) {
      if (error === 'AbortError') {
        console.warn('Image fetch aborted due to timeout.');
      } else {
        console.error('Error fetching image:', error);
      }
    }

    return undefined;
  }

}

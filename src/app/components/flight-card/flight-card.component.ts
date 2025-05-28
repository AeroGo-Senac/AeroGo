import { Component, Input } from '@angular/core';
import type { FlightComplete } from '../../../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  imports: [],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css'
})
export class FlightCardComponent {
  @Input() flight: FlightComplete = {} as FlightComplete;
  imgUrl: string | undefined;

  constructor(private router: Router) { }
  async ngOnInit() {
    this.imgUrl = await this.getRandonImage(this.flight.destination_airport.city);
  }

  async getRandonImage(city: string): Promise<string | undefined> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

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

  seatTypes = [
    { value: 'executive', label: 'Executiva' },
    { value: 'economic', label: 'Econômica' },
    { value: 'premium', label: 'Premium' }
  ];



  calcularDuracaoVoo(): string {
    const departureDate = new Date(this.flight.departure_date + 'T' + this.flight.departure_time);
    const arrivalDate = new Date(this.flight.arrival_date + 'T' + this.flight.arrival_time);
    const duration = new Date(arrivalDate.getTime() - departureDate.getTime());

    const hours = duration.getUTCHours();
    const minutes = duration.getUTCMinutes();

    return `${hours}h ${minutes}m`;
  }

  obterIndexVooMaisBarato(): number {
    const prices = this.flight.seat_classes.map(seatClass => seatClass.price);
    const minPrice = Math.min(...prices);
    return prices.indexOf(minPrice);
  }

  selectVoo(flight_number: string): void {
    this.router.navigate(['/flightsdetails', flight_number]);
  }
}

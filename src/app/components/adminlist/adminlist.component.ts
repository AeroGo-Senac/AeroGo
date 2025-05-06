import { Component, Input } from '@angular/core';
import type { FlightComplete } from '../../../types';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminlist',
  imports: [RouterModule],
  templateUrl: './adminlist.component.html',
  styleUrl: './adminlist.component.css'
})
export class AdminlistComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }
  @Input() flights: FlightComplete[] = [];
  @Input() detalhesVoo: (id: string) => void = () => { };

  adicionarIdNaRota(flight_number: string | number) {
    this.router.navigate([flight_number], { relativeTo: this.route });
  }

}

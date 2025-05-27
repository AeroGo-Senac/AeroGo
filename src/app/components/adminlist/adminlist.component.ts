import { Component, Input } from '@angular/core';
import type { FlightComplete } from '../../../types';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../core/services/flights.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminlist',
  imports: [RouterModule],
  templateUrl: './adminlist.component.html',
  styleUrl: './adminlist.component.css'
})
export class AdminlistComponent {

  constructor(private router: Router, private route: ActivatedRoute, private flighService: FlightService, private toastr: ToastrService) { }
  @Input() flights: FlightComplete[] = [];
  @Input() detalhesVoo: (id: string) => void = () => { };

  adicionarIdNaRota(flight_number: string | number) {
    this.router.navigate([flight_number], { relativeTo: this.route });
  }

  deletaVoo(id: string) {
    if (!confirm('Você tem certeza que deseja deletar este voo?')) return;
    this.flighService.deleteFlight(id).subscribe({
      next: () => {
        this.flights = this.flights.filter(flight => flight.id !== id);
        this.toastr.success('Voo deletado com sucesso!', 'Sucesso');
      },
      error: (error) => {
        console.error('Erro ao deletar voo:', error);
      }
    });
  }

}

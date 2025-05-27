import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../core/services/flights.service';
import type { Flight, FlightComplete } from '../../../types';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import type { User } from '../../../types';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  flight?: FlightComplete;
  seatType: string = '';
  total: string = '0.00';
  subtotal: string = this.total;

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
      private userService: UserService,
    private router: Router
  ) {}

    installmentsOptions: { label: string, value: string }[] = [];

  ngOnInit() {
    const flightNumber = this.route.snapshot.paramMap.get('flight_number');
    this.route.queryParamMap.subscribe(params => {
      this.seatType = params.get('seat') || '';
    });

    if (flightNumber) {
      this.flightService.getFlightById(flightNumber).subscribe(flights => {
        this.flight = flights[0];
        if (this.flight && this.seatType) {
          const seat = this.flight.seat_classes.find(s => s.type === this.seatType);
          if (seat) {
            this.total = seat.price.toFixed(2);
          }
        }
      });
    }

    if (flightNumber) {
      this.flightService.getFlightById(flightNumber).subscribe(flights => {
        this.flight = flights[0];
        if (this.flight && this.seatType) {
          const seat = this.flight.seat_classes.find(s => s.type === this.seatType);
          if (seat) {
            this.total = seat.price.toFixed(2);
            this.generateInstallmentsOptions(seat.price);
          }
        }
      });
    }
  }

  generateInstallmentsOptions(total: number) {
    this.installmentsOptions = [];
    for (let i = 1; i <= 10; i++) {
      const installmentValue = total / i;
      this.installmentsOptions.push({
        label: `${i}x de R$ ${installmentValue.toFixed(2)} sem juros`,
        value: installmentValue.toFixed(2)
      });
    }
    this.subtotal = total.toFixed(2);
  }

  selInstallments(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    this.subtotal = selectElement.value;
  }

  cardNumber = "";
  cardName = "";
  inputValidity = "";
  inputCVV = "";
  txtError = "";

validate() {
  if(this.cardNumber === "" || this.cardName === "" || this.inputValidity === "" || this.inputCVV === ""){
    this.txtError = "Preencha todos os campos";
  } else {
    this.txtError = "";
    alert(`Pagamento realizado com sucesso!\nValor: R$ ${this.subtotal}\nNúmero do Cartão: ${this.cardNumber}`);

    // Pegue o e-mail do objeto currentUser corretamente
    const currentUser = localStorage.getItem('currentUser');
    const email = currentUser ? JSON.parse(currentUser).email : null;
    if (email) {
      this.userService.getUserByEmail(email).subscribe(users => {
        if (users.length > 0) {
          const user: User = users[0];
          const updatedUser: User = {
            ...user,
            number_of_bookings: (user.number_of_bookings ?? 0) + 1
          };
          this.userService.updateUser(updatedUser).subscribe(() => {
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            console.log('Número de viagens atualizado!');
          });
        }
      });
    }
  }
}
}

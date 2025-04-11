import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  subtotal = "6419.00";

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
    }
  }
}

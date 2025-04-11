import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profille',
  imports: [],
  templateUrl: './my-profille.component.html',
  styleUrl: './my-profille.component.css'
})
export class MyProfilleComponent {
  isEditing = false;

  userProfile = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    birthDate: '14/05/1985',
    address: 'Av. Paulista, 1000, Apto 123, São Paulo - SP, 01310-100'
  };

  onChangeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userProfile.name = input.value;
  }

  onChangeEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userProfile.email = input.value;
  }

  onChangePhone(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userProfile.phone = input.value;
  }

  onChangeBirthDate(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userProfile.birthDate = input.value;
  }

  onChangeAddress(event: Event) {
    const input = event.target as HTMLInputElement;
    this.userProfile.address = input.value;
  }



  toggleEdit() {
    this.isEditing = !this.isEditing;

    if (!this.isEditing) {
    }
  }
}

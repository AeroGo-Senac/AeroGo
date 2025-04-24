import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { UserService } from '../../core/services/user.service';
import type { User } from '../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private userService: UserService) { }
  user = {
    email: '',
    password: '',
  }

  disabled = false;




  login() {
    this.disabled = true;
    if (!this.user.email || !this.user.password) {
      alert('Por favor, preencha todos os campos.');
      this.disabled = false;
      return;
    }
    this.userService.getUserByEmailAndPassword(this.user.email, this.user.password).subscribe(
      (response) => {
        console.log('Login response:', response);
        if (response.length > 0) {
          const user: User = response[0];
          alert(`Bem-vindo, ${user.name}!`);
        } else {
          alert('Email ou senha inválidos');
        }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
      },
      () => {
        this.disabled = false;
      }

    );
  }

  onChangeEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.user.email = input.value;
  }

  onChangePassword(event: Event) {
    const input = event.target as HTMLInputElement;
    this.user.password = input.value;
  }

}

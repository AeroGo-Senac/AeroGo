import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { UserService } from '../../core/services/user.service';
import type { User } from '../../../types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
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
  message = '';
  disabled = true;



  updateDisabledState() {
    this.disabled = this.user.email.length <= 0 || this.user.password.length <= 0;
  }

  login() {
    this.disabled = true;
    if (!this.user.email || !this.user.password) {
      this.message = 'Por favor, preencha todos os campos.';
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
          this.message = 'Email ou senha inválidos';
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

}

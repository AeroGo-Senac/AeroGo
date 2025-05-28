import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { UserService } from '../../core/services/user.service';
import { User } from '../../../types';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private userService: UserService, private router: Router) { }


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
          localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
          }));
          alert(`Bem-vindo, ${user.name}!`);
          if (user.is_admin) {
            this.router.navigate(['/admin']);
            return;
          }
          this.router.navigate(['/profile']);
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

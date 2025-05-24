import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../types';

@Component({
  selector: 'app-signup',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService: UserService, private router: Router) { }

  user: User = {
    id: '',
    name: '',
    email: '',
    password_hash: '',
    is_admin: false,
    created_at: new Date(),
    updated_at: new Date()
  };
  
  confirmPassword = ''; 

  disabled = true;

  updateDisabledState(): void {
    this.disabled = this.user.name.length <= 0 || 
                    this.user.email.length <= 0 || 
                    this.user.password_hash.length <= 0 || 
                    this.confirmPassword.length <= 0 || 
                    this.user.password_hash !== this.confirmPassword; 
  }

  register(): void {
    this.disabled = true;

    if (!this.user.name || !this.user.email || !this.user.password_hash || !this.confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      this.disabled = false;
      return;
    }

    if (this.user.password_hash !== this.confirmPassword) {
      alert('As senhas não coincidem. Por favor, digite novamente.');
      this.disabled = false;
      return;
    }

    this.userService.getUserByEmailAndPassword(this.user.email, this.user.password_hash).subscribe(
      (existingUsers) => {
        if (existingUsers.length > 0) {
          alert('Este e-mail já está cadastrado. Por favor, use outro e-mail.');
          this.disabled = false;
        } else {

          this.userService.newUser(this.user).subscribe(
            (response) => {
              console.log('Registro bem-sucedido:', response);
              alert(`Cadastro realizado com sucesso! Bem-vindo, ${response.name}!`);

              localStorage.setItem('currentUser', JSON.stringify({
                id: response.id, 
                name: response.name,
                email: response.email
              }));
              console.log('Usuário cadastrado e salvo no localStorage:', response.name);
              this.router.navigate(['/login']);
            },
          );
        }
      },
    );
  }
}
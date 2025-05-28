import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../types';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService: UserService, private router: Router, private toast: ToastrService) { }

  user: User = {
    id: '',
    name: '',
    email: '',
    password_hash: '',
    is_admin: false,
    created_at: new Date(),
    updated_at: new Date(),
    telefone: '',
    date: new Date(),
    address: {
      cep: '',
      street: '',
      number: '',
      complement: undefined,
      neighborhood: '',
      city: '',
      state: ''
    }
  };

  confirmPassword = '';
  message = '';
  disabled = true;

  buscarEndereco(): void {
    const cep = this.user.address.cep.replace(/\D/g, '');

    if (cep.length !== 8) {
      this.message = 'CEP inválido.';
      return;
    }

    this.userService.getAddressByCep(cep).subscribe(
      (data) => {
        if (data.erro) {
          this.message = 'CEP não encontrado.';
          return;
        }

        this.user.address.street = data.logradouro;
        this.user.address.neighborhood = data.bairro;
        this.user.address.city = data.localidade;
        this.user.address.state = data.uf;
        this.message = '';
      },
      (error) => {
        this.message = 'Erro ao buscar endereço.';
        console.error(error);
      }
    );
  }

  formatarEndereco(): string {
    const addr = this.user.address;
    if (!addr.street) return '';
    return `${addr.street}, ${addr.neighborhood} - ${addr.city}/${addr.state}`;
  }



  register(): void {

    if (!this.user.name || !this.user.email || !this.user.password_hash || !this.confirmPassword || !this.user.telefone || !this.user.address.cep || !this.user.address.street) {
      this.message = 'Por favor, preencha todos os campos.';
      this.toast.error('Por favor, preencha todos os campos.', 'Erro');
      return;
    }

    if (this.user.password_hash !== this.confirmPassword) {
      this.message = 'As senhas não coincidem. Por favor, digite novamente.';
      this.toast.error('As senhas não coincidem. Por favor, digite novamente.', 'Erro');
      return;
    }

    this.userService.getUserByEmail(this.user.email).subscribe(
      (existingUsers) => {
        if (existingUsers.length > 0) {
          this.message = 'Este e-mail já está cadastrado. Por favor, use outro e-mail.';
          this.toast.error('Este e-mail já está cadastrado. Por favor, use outro e-mail.', 'Erro');

        } else {
          this.userService.newUser(this.user).subscribe(
            (response) => {
              this.toast.success('Cadastro realizado com sucesso!', 'Sucesso');
              this.router.navigate(['/login']);
            },
          );
        }
      },
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-my-profille',
  imports: [],
  templateUrl: './my-profille.component.html',
  styleUrl: './my-profille.component.css'
})
export class MyProfilleComponent implements OnInit{
  userProfile = {
    name: '',
    email: '',
    telefone: '',
    date: '',
    address: ''
  };

  isEditing = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    const userId = currentUser ? JSON.parse(currentUser).id : null;

    if (userId) {
      this.userService.getUserById(userId).subscribe((user: any) => {
        this.userProfile = {
          name: user.name,
          email: user.email,
          telefone: user.telefone,
          date: user.date,
          address: user.address.street
        };
      });
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onChangeName(event: Event) {
    this.userProfile.name = (event.target as HTMLInputElement).value;
  }

  onChangeEmail(event: Event) {
    this.userProfile.email = (event.target as HTMLInputElement).value;
  }

  onChangePhone(event: Event) {
    this.userProfile.telefone = (event.target as HTMLInputElement).value;
  }

  onChangeBirthDate(event: Event) {
    this.userProfile.date = (event.target as HTMLInputElement).value;
  }

  onChangeAddress(event: Event) {
    this.userProfile.address = (event.target as HTMLInputElement).value;
  }
}

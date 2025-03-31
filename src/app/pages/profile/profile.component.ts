import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { MyProfilleComponent } from '../../components/my-profille/my-profille.component';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, MyProfilleComponent, LucideAngularModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {

}

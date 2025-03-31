import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { MyProfilleComponent } from '../../components/my-profille/my-profille.component';

@Component({
  selector: 'app-profille',
  imports: [ HeaderComponent, MyProfilleComponent, LucideAngularModule],
  templateUrl: './profille.component.html',
  styleUrl: './profille.component.css'
})

export class ProfilleComponent {

}

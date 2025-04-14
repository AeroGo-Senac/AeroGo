import { Component } from '@angular/core';
import { Import, LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { MyDocumentsComponent } from '../../components/my-documents/my-documents.component';
import { MyProfilleComponent } from '../../components/my-profille/my-profille.component';
import { TravelPreferencesComponent } from "../../components/travel-preferences/travel-preferences.component";

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, MyProfilleComponent, LucideAngularModule, MyDocumentsComponent, TravelPreferencesComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  modoPerfil: 'perfil' | 'documentos' | 'preferencias' = 'perfil';

  mostrarPerfil() {
    this.modoPerfil = "perfil";
  }

  mostrarDocuments() {
    this.modoPerfil = "documentos";
  }

  mostrarPreferences() {
    this.modoPerfil = "preferencias";
  }
}

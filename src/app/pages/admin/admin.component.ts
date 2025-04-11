import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component"
import { AdminlistComponent } from '../../components/adminlist/adminlist.component';
import { AdmformComponent } from "../../components/adminform/adminform.component";

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, AdminlistComponent, AdmformComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  modoFormulario: boolean = false;

  mostrarFormulario() {
    this.modoFormulario = true;
  }

  mostrarLista() {
    this.modoFormulario = false;
  }
}

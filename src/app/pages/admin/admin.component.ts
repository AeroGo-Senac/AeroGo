import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component"
import { AdminlistComponent } from '../../components/adminlist/adminlist.component';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, AdminlistComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}

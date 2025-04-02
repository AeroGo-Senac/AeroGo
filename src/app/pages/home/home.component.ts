import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  somenteIda: string = '1';

  onChangeIda(event: Event) {
    const input = event.target as HTMLInputElement;
    this.somenteIda = input.value;
  }

}

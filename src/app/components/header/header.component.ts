import { Component } from '@angular/core';
import { LucideAngularModule, Plane } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly Plane = Plane;
}

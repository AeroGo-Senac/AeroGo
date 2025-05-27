import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Plane, User } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  readonly Plane = Plane;

  constructor(private router: Router) { }

  isLoggedIn = false;
  userName = '';

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    this.isLoggedIn = !!user;

    if (user) {
      this.userName = JSON.parse(user).name;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

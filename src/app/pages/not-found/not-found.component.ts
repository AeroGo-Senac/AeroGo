import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  seconds = 10;
  interval!: ReturnType<typeof setInterval>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.seconds--;
      if (this.seconds === 0) {
        clearInterval(this.interval);
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goBack() {
    window.history.back();
  }
}

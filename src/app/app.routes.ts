import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetalhesVooComponent } from './pages/detalhes-voo/detalhes-voo.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/:id', component: AdminComponent },
  { path: 'flights', component: FlightsComponent },
  { path: 'flightsdetails', component: DetalhesVooComponent, title: 'Detalhes do Voo' },
  { path: 'signup', component: SignupComponent },
  { path: 'payment/:flight_number', component: PaymentComponent },
  { path: 'flightsdetails/:flight_number', component: DetalhesVooComponent },
  { path: '**', component: NotFoundComponent },
];


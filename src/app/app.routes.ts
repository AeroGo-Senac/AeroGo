import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
<<<<<<< HEAD
import { AdmComponent } from './pages/adm/adm.component';
=======
import { AdminComponent } from './pages/admin/admin.component';
>>>>>>> 6d7268bf18984c2ced71f91bbf743ba8106851ea

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
<<<<<<< HEAD
  { path: 'adm', component: AdmComponent },
=======
  { path: 'admin', component: AdminComponent },
>>>>>>> 6d7268bf18984c2ced71f91bbf743ba8106851ea
];

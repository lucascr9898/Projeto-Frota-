import { Routes } from '@angular/router';
import { LoginComponent } from './tela-login/tela-login';
import { Dashboard } from './dashboard/dashboard';
import { Veiculos } from './veiculos/veiculos';
import { authGuard } from './auth/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'veiculos',
    component: Veiculos,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'login' }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'with-signal',
    loadComponent: () =>
      import('./with-signals/with-signals.component').then(
        (m) => m.WithSignalsComponent
      ),
  },
  {
    path: 'without-signal',
    loadComponent: () =>
      import('./without-signals/without-signals.component').then(
        (m) => m.WithoutSignalsComponent
      ),
  },
];

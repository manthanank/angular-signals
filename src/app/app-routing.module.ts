import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'with-signal', loadChildren: () => import('./with-signals/with-signals.module').then(m => m.WithSignalsModule) },
  { path: 'without-signal', loadChildren: () => import('./without-signals/without-signals.module').then(m => m.WithoutSignalsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

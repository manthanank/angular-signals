import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  { path: 'with-signal', loadChildren: () => import('./with-signals/with-signals.module').then(m => m.WithSignalsModule) },
  { path: 'without-signal', loadChildren: () => import('./without-signals/without-signals.module').then(m => m.WithoutSignalsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithSignalsComponent } from './with-signals/with-signals.component';
import { WithoutSignalsComponent } from './without-signals/without-signals.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'with-signal', component: WithSignalsComponent },
  { path: 'without-signal', component: WithoutSignalsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

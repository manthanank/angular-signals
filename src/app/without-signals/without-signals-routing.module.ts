import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutSignalsComponent } from './without-signals.component';

const routes: Routes = [
  { path: '', component: WithoutSignalsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithoutSignalsRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithSignalsComponent } from './with-signals.component';

const routes: Routes = [{ path: '', component: WithSignalsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithSignalsRoutingModule {}

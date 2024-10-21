import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithSignalsComponent } from './with-signals.component';
import { WithSignalsRoutingModule } from './with-signals-routing.module';

@NgModule({
  declarations: [WithSignalsComponent],
  imports: [CommonModule, WithSignalsRoutingModule],
})
export class WithSignalsModule {}

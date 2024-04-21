// without-signals.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithoutSignalsComponent } from './without-signals.component';
import { WithoutSignalsRoutingModule } from './without-signals-routing.module';

@NgModule({
  declarations: [WithoutSignalsComponent],
  imports: [CommonModule, WithoutSignalsRoutingModule]
})
export class WithoutSignalsModule { }
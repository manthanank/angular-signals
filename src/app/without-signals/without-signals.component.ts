import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-without-signals',
  standalone: true,
  imports: [NgFor],
  templateUrl: './without-signals.component.html',
  styleUrl: './without-signals.component.scss'
})
export class WithoutSignalsComponent {
  actions: string[] = [];
  counter = 0;

  increment() {
    this.counter++;
    this.actions.push('INCREMENT');
  }

  decrement() {
    this.counter--;
    this.actions.push('DECREMENT');
  }
}

import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-with-signals',
  templateUrl: './with-signals.component.html',
  styleUrl: './with-signals.component.scss',
})
export class WithSignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log(this.counter()));
  }

  increment() {
    // this.counter.update((oldCounter) => oldCounter + 1);
    this.counter.set(this.counter() + 1);
    // this.actions.mutate((oldActions) => oldActions.push('INCREMENT'));
    this.actions.set([...this.actions(), 'INCREMENT']);
  }

  decrement() {
    this.counter.update((oldCounter) => oldCounter - 1);
    this.actions.update((oldActions) => [...oldActions, 'DECREMENT']);
  }
}

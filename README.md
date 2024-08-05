# Angular Signals

Angular Signals is a powerful system that provides detailed monitoring of state usage within an application, enabling the framework to efficiently optimize rendering updates.

## Table of Contents

- [Simple Example of Angular Signals in Action](#simple-example-of-angular-signals-in-action)
  - [In Standalone Components](#in-standalone-components)
  - [In Non Standalone Components](#in-non-standalone-components)

## Simple Example of Angular Signals in Action

Here are two examples of Angular Signals in action. The first example uses Angular Signals, while the second example does not. Both examples have a counter that increments and decrements, and a log that displays the actions taken. The difference between the two examples is that the first example uses Angular Signals to manage the state, while the second example uses the default Angular change detection.

Example is created in two ways:

1. [In Standalone Components](#in-standalone-components)
2. [In Non Standalone Components](#in-non-standalone-components)

## In Standalone Components

Code for the examples below can be found in the branch `with-standalone-components`.

Demo: [Angular Signals](https://amazing-gecko-07a618.netlify.app)

Project Structure:

```text
├── public/
│   |── favicon.ico
├── src/
│   ├── app/
│   │   ├── home/
│   │   │   ├── home.component.html
|   |   |   ├── home.component.spec.ts
│   │   │   ├── home.component.ts
│   │   │   └── home.component.scss
│   │   ├── navbar/
│   │   │   ├── navbar.component.html
|   |   |   ├── navbar.component.spec.ts
│   │   │   ├── navbar.component.ts
│   │   │   └── navbar.component.scss
│   │   ├── with-signals/
│   │   │   ├── with-signals.component.html
|   |   |   ├── with-signals.component.spec.ts
│   │   │   ├── with-signals.component.ts
│   │   │   └── with-signals.component.scss
│   │   ├── without-signals/
│   │   │   ├── without-signals.component.html
|   |   |   ├── without-signals.component.spec.ts
│   │   │   ├── without-signals.component.ts
│   │   │   └── without-signals.component.scss
│   │   ├── app.component.html
│   │   └── app.component.ts
|   |   └── app.component.spec.ts
|   |   └── app.component.scss
|   |   └── app.config.ts
|   |   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

Here is the code for the above project structure:

In `app.component.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
```

In `app.component.html`:

```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

In `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
```

In `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
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
```

In `navbar.component.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
```

In `navbar.component.html`:

```html
<nav>
    <a routerLink="/home" class="link" routerLinkActive="active">Home</a>
    <a routerLink="/with-signal" class="link" routerLinkActive="active">With Signal Example</a>
    <a routerLink="/without-signal" class="link" routerLinkActive="active">Without Signal Example</a>
</nav>
```

In `navbar.component.scss`:

```scss
nav {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;

    a {
        color: #fff;
        text-decoration: none;
        padding: 10px 15px;
        border-radius: 5px;
        // background-color: #333;
        transition: background-color 0.3s;

        &:hover {
            background-color: #555;
        }
    }

    .active {
        background-color: #555;
    }
}
```

In `home.component.html`:

```html
<div class="container">
    <h1>
        Angular Signals
    </h1>

    <img src="favicon.ico" alt="Angular Logo">
</div>
```

In `home.component.scss`:

```scss
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;

    h1 {
        color: #f0eef5;
        text-align: center;
        margin-top: 3rem;
    }

    img {
        display: block;
        margin: 0 auto;
    }
}
```

In `home.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
```

In `with-signals.component.ts`:

```typescript
import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-with-signals',
  standalone: true,
  imports: [NgFor],
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
```

In `with-signals.component.html`:

```html
<h1>Signals</h1>

<div id="counter">
  <p id="counter-output">Counter: {{ doubleCounter() }}</p>
  <div id="counter-btns">
    <button (click)="decrement()">Decrement</button>
    <button (click)="increment()">Increment</button>
  </div>
</div>

<h2>Action Log</h2>
<ol id="log">
  <li *ngFor="let action of actions()">{{ action }}</li>
</ol>
```

In `without-signals.component.ts`:

```typescript
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
```

In `without-signals.component.html`:

```html
<h1>Default (Automatic Change Detection)</h1>

<div id="counter">
    <p id="counter-output">Counter: {{ counter }}</p>
    <div id="counter-btns">
        <button (click)="decrement()">Decrement</button>
        <button (click)="increment()">Increment</button>
    </div>
</div>

<h2>Action Log</h2>
<ol id="log">
    <li *ngFor="let action of actions">{{ action }}</li>
</ol>
```

In `styles.scss`:

```scss
* {
    box-sizing: border-box;
  }
  
  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  
  body {
    margin: 0;
    background-color: #131216;
    color: #f0eef5;
  }
  
  h1,
  h2 {
    text-align: center;
  }
  
  #counter {
    margin: 3rem auto;
    max-width: 40rem;
    text-align: center;
  }
  
  #counter-output {
    font-size: 2rem;
    padding: 0.5rem 1.5rem;
    color: #a292d0;
  }
  
  #counter-btns {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  button {
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #a688ff;
    color: #070312;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #8e8eff;
  }
  
  #log {
    text-align: center;
    list-style: none;
    margin: 3rem 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
```

## In Non Standalone Components

Code for the examples below can be found in the branch `without-standalone-components`.

Demo: [Angular Signals](https://vocal-valkyrie-2b9d38.netlify.app)

Project Structure:

```text
├── src/
│   ├── app/
│   │   ├── home/
│   │   │   ├── home.component.html
|   |   |   ├── home.component.spec.ts
│   │   │   ├── home.component.ts
│   │   │   └── home.component.scss
│   │   ├── navbar/
│   │   │   ├── navbar.component.html
|   |   |   ├── navbar.component.spec.ts
│   │   │   ├── navbar.component.ts
│   │   │   └── navbar.component.scss
│   │   ├── with-signals/
│   │   │   ├── with-signals.component.html
|   |   |   ├── with-signals.component.spec.ts
│   │   │   ├── with-signals.component.ts
│   │   │   └── with-signals.component.scss
│   │   ├── without-signals/
│   │   │   ├── without-signals.component.html
|   |   |   ├── without-signals.component.spec.ts
│   │   │   ├── without-signals.component.ts
│   │   │   └── without-signals.component.scss
│   │   ├── app.component.html
│   │   └── app.component.ts
|   |   └── app.component.scss
|   |   └── app.component.spec.ts
|   |   └── app.module.ts
|   |   └── app.routing.module.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

Here is the code for the above project structure:

In `app.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-signals';
}
```

In `app.component.html`:

```html
<app-navbar></app-navbar>
<router-outlet></router-outlet>
```

In `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

In `app.routing.module.ts`:

```typescript
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
```

In `navbar.component.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
```

In `navbar.component.html`:

```html
<nav>
    <a routerLink="/home" class="link" routerLinkActive="active">Home</a>
    <a routerLink="/with-signal" class="link" routerLinkActive="active">With Signal Example</a>
    <a routerLink="/without-signal" class="link" routerLinkActive="active">Without Signal Example</a>
</nav>
```

In `navbar.component.scss`:

```scss
nav {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 20px;

    a {
        color: #fff;
        text-decoration: none;
        padding: 10px 15px;
        border-radius: 5px;
        // background-color: #333;
        transition: background-color 0.3s;

        &:hover {
            background-color: #555;
        }
    }

    .active {
        background-color: #555;
    }
}
```

In `navbar.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
```

In `home-routing.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
```

In `home.component.html`:

```html
<div class="container">
    <h1>
        Angular Signals
    </h1>

    <img src="favicon.ico" alt="Angular Logo">
</div>
```

In `home.component.scss`:

```scss
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;

    h1 {
        color: #f0eef5;
        text-align: center;
        margin-top: 3rem;
    }

    img {
        display: block;
        margin: 0 auto;
    }
}
```

In `home.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
```

In `home.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule { }
```

In `with-signals-routing.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithSignalsComponent } from './with-signals.component';

const routes: Routes = [
  { path: '', component: WithSignalsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithSignalsRoutingModule { }
```

In `with-signals.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithSignalsComponent } from './with-signals.component';
import { WithSignalsRoutingModule } from './with-signals-routing.module';

@NgModule({
  declarations: [WithSignalsComponent],
  imports: [CommonModule, WithSignalsRoutingModule]
})
export class WithSignalsModule { }
```

In `with-signals.component.ts`:

```typescript
import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-with-signals',
  standalone: true,
  imports: [NgFor],
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
```

In `with-signals.component.html`:

```html
<h1>Signals</h1>

<div id="counter">
  <p id="counter-output">Counter: {{ doubleCounter() }}</p>
  <div id="counter-btns">
    <button (click)="decrement()">Decrement</button>
    <button (click)="increment()">Increment</button>
  </div>
</div>

<h2>Action Log</h2>
<ol id="log">
  <li *ngFor="let action of actions()">{{ action }}</li>
</ol>
```

In `without-signals-routing.module.ts`:

```typescript
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
```

In `without-signals.module.ts`:

```typescript
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
```

In `without-signals.component.ts`:

```typescript
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
```

In `without-signals.component.html`:

```html
<h1>Default (Automatic Change Detection)</h1>

<div id="counter">
    <p id="counter-output">Counter: {{ counter }}</p>
    <div id="counter-btns">
        <button (click)="decrement()">Decrement</button>
        <button (click)="increment()">Increment</button>
    </div>
</div>

<h2>Action Log</h2>
<ol id="log">
    <li *ngFor="let action of actions">{{ action }}</li>
</ol>
```

In `styles.scss`:

```scss
* {
    box-sizing: border-box;
  }
  
  html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
  
  body {
    margin: 0;
    background-color: #131216;
    color: #f0eef5;
  }
  
  h1,
  h2 {
    text-align: center;
  }
  
  #counter {
    margin: 3rem auto;
    max-width: 40rem;
    text-align: center;
  }
  
  #counter-output {
    font-size: 2rem;
    padding: 0.5rem 1.5rem;
    color: #a292d0;
  }
  
  #counter-btns {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  button {
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    background-color: #a688ff;
    color: #070312;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #8e8eff;
  }
  
  #log {
    text-align: center;
    list-style: none;
    margin: 3rem 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
```

## Conclusion

Angular Signals is a powerful system that provides detailed monitoring of state usage within an application, enabling the framework to efficiently optimize rendering updates. By using Angular Signals, developers can create more efficient and performant applications that are easier to maintain and scale.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Angular](https://angular.io/)
- [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/)
- [Udemy](https://www.udemy.com/)
- [Netlify](https://www.netlify.com/)
- [Angular - The Complete Guide (2024 Edition)](https://www.udemy.com/course-dashboard-redirect/?course_id=756150)

This projects were created as part of the Angular - The Complete Guide (2024 Edition) course by Maximilian Schwarzmüller on Udemy.

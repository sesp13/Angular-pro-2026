import { Component, signal } from '@angular/core';
import { MySespSidebar, TitleColor } from 'my-sesp-sidebar';

@Component({
  selector: 'app-root',
  imports: [MySespSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isAutheticated = signal(false);
  TitleColor = TitleColor;

  onLogin() {
    this.isAutheticated.set(true);
  }

  onLogOut() {
    this.isAutheticated.set(false);
  }
}

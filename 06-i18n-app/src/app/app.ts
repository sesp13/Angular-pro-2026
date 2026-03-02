import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { LanguageService } from './services/LanguageService.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  cookie = inject(SsrCookieService);
  languageService = inject(LanguageService);

  constructor() {
    console.log({ cookie: this.cookie.get('lang') });

    const lang = this.cookie.check('lang') ? this.cookie.get('lang') : 'en';

    this.languageService.changeLang(lang);
  }
}

import { inject, Injectable, InjectionToken, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const SERVER_LANG_TOKEN = new InjectionToken<string>('SERVER_LANG_TOKEN');

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private cookie = inject(SsrCookieService);
  private translate = inject(TranslateService);
  public currentLang = signal('');

  public changeLang(lang: string) {
    this.cookie.set('lang', lang);

    this.translate.setFallbackLang(lang);
    this.translate.use(lang);
    this.currentLang.set(lang);
  }
}

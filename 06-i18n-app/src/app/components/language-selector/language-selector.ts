import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/LanguageService.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  imports: [TranslatePipe],
  templateUrl: './language-selector.html',
  styleUrl: './language-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelector {
  private languageService = inject(LanguageService);

  public languages = signal([
    { code: 'en', flag: '🇺🇸' },
    { code: 'es', flag: '🇪🇸' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'it', flag: '🇮🇹' },
  ]);

  public currentLang = this.languageService.currentLang;

  public changeLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;
    this.languageService.changeLang(lang);
  }
}

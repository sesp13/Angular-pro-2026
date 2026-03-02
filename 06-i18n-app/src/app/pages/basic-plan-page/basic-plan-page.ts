import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageSelector } from "../../components/language-selector/language-selector";
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-basic-plan-page',
  imports: [LanguageSelector, LanguageSelector, RouterLink, TranslatePipe],
  templateUrl: './basic-plan-page.html',
  styleUrl: './basic-plan-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPlanPage {}

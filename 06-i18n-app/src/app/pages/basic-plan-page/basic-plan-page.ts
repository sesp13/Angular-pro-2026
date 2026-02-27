import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LanguageSelector } from "../../components/language-selector/language-selector";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-basic-plan-page',
  imports: [LanguageSelector, LanguageSelector, RouterLink],
  templateUrl: './basic-plan-page.html',
  styleUrl: './basic-plan-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPlanPage {}

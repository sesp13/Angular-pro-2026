import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LanguageSelector } from "../../components/language-selector/language-selector";

@Component({
  selector: 'app-products-page',
  imports: [RouterLink, LanguageSelector],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsPage {}

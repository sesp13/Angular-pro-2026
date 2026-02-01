import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID)

  public ngOnInit(): void {
    
    // Diff between browser and server
    // if(isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing page';
    // }

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Pricing page',
    });
    this.meta.updateTag({
      name: 'og:title',
      content: 'Pricing Page',
    });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Programacion',
    });
  }
}

import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export enum TitleColor {
  red = 'text-red-500',
  green = 'text-green-500',
  purple = 'text-purple-500',
  blue = 'text-blue-500',
}

@Component({
  selector: 'lib-my-sesp-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './my-sesp-sidebar.html',
  styles: ``,
})
export class MySespSidebar {
  public isAuthenticated = input(false);
  titleColor = input<TitleColor>(TitleColor.blue);

  public onSignOut = output();
  public onSignIn = output();
}

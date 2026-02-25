import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "../../../shared/components/side-menu/side-menu";
import { ApxSideMenuComponent, TitleColor } from 'apx-side-menu';


@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, SideMenu, ApxSideMenuComponent],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminLayout { 
  isAutheticated = signal(false);
  TitleColor = TitleColor;

  onLogin() {
    this.isAutheticated.set(true);
  }

  onLogOut() {
    this.isAutheticated.set(false)
  }

}

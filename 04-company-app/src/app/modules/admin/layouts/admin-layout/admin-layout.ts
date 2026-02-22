import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "../../../shared/components/side-menu/side-menu";


@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, SideMenu],
  templateUrl: './admin-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminLayout { 
  isAutheticated = signal(false);

  onLogin() {
    this.isAutheticated.set(true);
  }

  onLogOut() {
    this.isAutheticated.set(false)
  }

}

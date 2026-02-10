import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-issue-page',
  imports: [],
  templateUrl: './issue-page.html',
  styleUrl: './issue-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePage { }

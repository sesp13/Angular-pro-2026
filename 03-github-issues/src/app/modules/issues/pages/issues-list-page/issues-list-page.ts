import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-issues-list-page',
  imports: [],
  templateUrl: './issues-list-page.html',
  styleUrl: './issues-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPage { }

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IssuesService } from '../../services/IssuesService..service';
import { IssuesLabelsSelector } from '../../components/issues-labels-selector/issues-labels-selector';
import { IssueItem } from '../../components/issue-item/issue-item';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  imports: [IssuesLabelsSelector, IssueItem],
  templateUrl: './issues-list-page.html',
  styleUrl: './issues-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPage {
  public issuesService = inject(IssuesService);

  public get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  public get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  onChangeState(newState: string): void {
    const state =
      {
        [State.All]: State.All,
        [State.Open]: State.Open,
        [State.Closed]: State.Closed,
      }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }
}

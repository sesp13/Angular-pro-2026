import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IssuesService } from '../../services/IssuesService..service';
import { IssuesLabelsSelector } from "../../components/issues-labels-selector/issues-labels-selector";
import { IssueItem } from "../../components/issue-item/issue-item";

@Component({
  selector: 'app-issues-list-page',
  imports: [ IssuesLabelsSelector, IssueItem],
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
}

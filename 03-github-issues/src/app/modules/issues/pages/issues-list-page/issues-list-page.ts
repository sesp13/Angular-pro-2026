import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/IssuesService..service';
import { IssuesLabelsSelector } from "../../components/issues-labels-selector/issues-labels-selector";

@Component({
  selector: 'app-issues-list-page',
  imports: [RouterLink, IssuesLabelsSelector],
  templateUrl: './issues-list-page.html',
  styleUrl: './issues-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuesListPage {
  public issuesService = inject(IssuesService);

  public get labelsQuery() {
    return this.issuesService.labelsQuery;
  }
}

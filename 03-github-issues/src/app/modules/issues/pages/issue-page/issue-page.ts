import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueComment } from "../../components/IssueComment/IssueComment";

@Component({
  selector: 'app-issue-page',
  imports: [RouterLink, IssueComment],
  templateUrl: './issue-page.html',
  styleUrl: './issue-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IssuePage {
  public route = inject(ActivatedRoute);
  private issueService = inject(IssueService);

  public issueNumber = toSignal<string>(
    this.route.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      tap((issueNumber) => {
        this.issueService.setIssueNumber(issueNumber);
      }),
    ),
  );

  public get issueQuery() {
    return this.issueService.issueQuery;
  }

  public get issueCommentsQuery() {
    return this.issueService.issueCommentsQuery;
  }
}

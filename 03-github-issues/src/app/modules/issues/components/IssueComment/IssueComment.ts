import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubIssue } from '../../interfaces';
import { MarkdownModule } from "ngx-markdown";

@Component({
  selector: 'app-issue-comment',
  imports: [MarkdownModule],
  templateUrl: './IssueComment.html',
  styleUrl: './IssueComment.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueComment {
  public issue = input.required<GithubIssue>()
 }

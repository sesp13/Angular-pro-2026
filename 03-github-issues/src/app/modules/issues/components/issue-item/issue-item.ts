import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.html',
  styleUrl: './issue-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {
  public issue = input.required<GithubIssue>();
  private issueService = inject(IssueService);

  public get isOpen() {
    return this.issue().state === State.Open;
  }

  public prefetchData() {
    // this.issueService.prefetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue())
  }
}

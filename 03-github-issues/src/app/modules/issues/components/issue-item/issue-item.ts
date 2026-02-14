import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-issue-item',
  imports: [RouterLink, NgStyle],
  templateUrl: './issue-item.html',
  styleUrl: './issue-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {
  public issue = input.required<GithubIssue>();

  public get isOpen() {
    return this.issue().state === State.Open;
  }
}

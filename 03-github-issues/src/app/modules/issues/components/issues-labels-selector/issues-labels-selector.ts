import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GithubLabel } from '../../interfaces';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-issues-labels-selector',
  imports: [NgStyle],
  templateUrl: './issues-labels-selector.html',
  styleUrl: './issues-labels-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesLabelsSelector {
  labels = input.required<GithubLabel[]>();
}

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GithubLabel } from '../../interfaces';
import { NgStyle } from '@angular/common';
import { IssuesService } from '../../services/IssuesService..service';

@Component({
  selector: 'app-issues-labels-selector',
  imports: [NgStyle],
  templateUrl: './issues-labels-selector.html',
  styleUrl: './issues-labels-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssuesLabelsSelector {
  labels = input.required<GithubLabel[]>();
  issuesService = inject(IssuesService);

  public isSelected(labelName: string): boolean {
    return this.issuesService.selectedLabels().has(labelName);
  }

  public onToggleLabel(labelName: string): void {
    this.issuesService.toggleLabel(labelName);
  }
}

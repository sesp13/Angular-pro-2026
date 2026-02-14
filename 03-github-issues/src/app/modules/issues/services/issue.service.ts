import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentByNumber } from '../actions';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    // Dont show until
    enabled: this.issueNumber() !== null,
  }));

  public issueCommentsQuery = injectQuery(() => ({
    enabled: this.issueNumber() !== undefined,
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentByNumber(this.issueNumber()!),
  }));

  public setIssueNumber(id: string) {
    this.issueNumber.set(id);
  }
}

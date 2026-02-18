import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber, getIssueCommentByNumber } from '../actions';
import { GithubIssue } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);
  private queryClient = inject(QueryClient);

  public issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    // Dont show until
    enabled: this.issueNumber() !== null,
    staleTime: 1000 * 60 * 5,
  }));

  public issueCommentsQuery = injectQuery(() => ({
    enabled: this.issueNumber() !== undefined,
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentByNumber(this.issueNumber()!),
  }));

  public setIssueNumber(id: string) {
    this.issueNumber.set(id);
  }

  public prefetchIssue(issueId: string) {
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: 1000 * 60 * 5, // 5 minutos
    });
  }

  public setIssueData(issue: GithubIssue) {
    this.queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
  }
}

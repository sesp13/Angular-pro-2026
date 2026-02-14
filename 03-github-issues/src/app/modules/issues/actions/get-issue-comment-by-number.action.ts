import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueCommentByNumber = async (issueNumber: string): Promise<GithubIssue[]> => {
  await sleep(1500);

  try {
    const res = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw 'Cant load issue comment';
    }
    const issue = (await res.json()) as GithubIssue[];
    return issue;
  } catch (error) {
    throw 'Cant load issue comment';
  }
};
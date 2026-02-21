import { sleep } from '@helpers/sleep';
import { environment } from 'src/environments/environment';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueByNumber = async (issueNumber: string): Promise<GithubIssue> => {
  await sleep(1500);

  try {
    const res = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw `Cant load issue ${issueNumber}`;
    }
    const issue = (await res.json()) as GithubIssue;
    return issue;
  } catch (error) {
    throw `Cant load issue ${issueNumber}`;
  }
};

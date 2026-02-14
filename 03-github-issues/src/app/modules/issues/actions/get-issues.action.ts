import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment';
import { GithubIssue } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssues = async (): Promise<GithubIssue[]> => {
  await sleep(1500);

  try {
    const res = await fetch(`${BASE_URL}/issues`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw 'Cant load issues';
    }
    const issues = (await res.json()) as GithubIssue[];
    return issues;
  } catch (error) {
    throw 'Cant load issues';
  }
};
import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';
import { environment } from 'src/environments/environment';
import { GithubIssue, State } from '../interfaces';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssues = async (
  state: State = State.All,
  selectedLabels: string[] = [],
): Promise<GithubIssue[]> => {
  await sleep(1500);

  const params = new URLSearchParams();
  params.append('state', state);

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  try {
    const res = await fetch(`${BASE_URL}/issues?${params}`, {
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

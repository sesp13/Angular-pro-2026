import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  try {
    const res = await fetch(`${BASE_URL}/labels`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });
    if (!res.ok) {
      throw 'Cant load labels';
    }
    const labels = (await res.json()) as GithubLabel[];
    return labels;
  } catch (error) {
    throw 'Cant load labels';
  }
};

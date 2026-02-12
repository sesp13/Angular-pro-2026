import { sleep } from '@helpers/sleep';
import { GithubLabel } from '../interfaces/github-label.interface';

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  try {
    const res = await fetch(`https://api.github.com/repos/angular/angular/labels`);
    if (!res.ok) {
      throw 'Cant load labels';
    }
    const labels = (await res.json()) as GithubLabel[];
    console.log({ labels });
    return labels;
  } catch (error) {
    throw 'Cant load labels';
  }
};

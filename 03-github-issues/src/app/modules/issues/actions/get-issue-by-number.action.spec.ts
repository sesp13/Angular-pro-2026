import { environment } from 'src/environments/environment';
import { GithubIssue } from '../interfaces';
import { getIssueByNumber } from './get-issue-by-number.action';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const mockIssue: Partial<GithubIssue> = {
  id: 1,
  number: 123,
  title: 'TestIssue',
  body: 'Issue',
};

describe('getIssueByNumber', () => {
  const mockIssueNumber = '123';
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    // Restore default fetch value
    window.fetch = originalFetch;
  });

  it('should fetch and return an issue succesfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(mockIssue) });
    const result = await getIssueByNumber(mockIssueNumber);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });
    expect(result).toEqual(mockIssue);
  });

  it('should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({ ok: false, status: 404, json: vi.fn() });

    await expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(
      `Cant load issue ${mockIssueNumber}`,
    );
  });

  it('should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    await expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(
      `Cant load issue ${mockIssueNumber}`,
    );
  });
});

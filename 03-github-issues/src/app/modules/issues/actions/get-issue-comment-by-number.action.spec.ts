import { environment } from 'src/environments/environment';
import { GithubIssue } from '../interfaces';
import { getIssueCommentByNumber } from './get-issue-comment-by-number.action';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

const mockComments: Partial<GithubIssue>[] = [
  {
    id: 1,
    number: 123,
    title: 'TestIssue',
    body: 'Issue',
  },
];

describe('getIssueCommentByNumber', () => {
  const mockIssueNumber = '123';
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    // Restore default fetch value
    window.fetch = originalFetch;
  });

  it('should fetch and return an issue comment succesfully', async () => {
    window.fetch = vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(mockComments) });
    const result = await getIssueCommentByNumber(mockIssueNumber);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}/comments`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
    });
    expect(result).toEqual(mockComments);
  });

  it('should throw an error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({ ok: false, status: 404, json: vi.fn() });

    await expect(getIssueCommentByNumber(mockIssueNumber)).rejects.toBe(
      `Cant load issue comment`,
    );
  });

  it('should throw an error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    await expect(getIssueCommentByNumber(mockIssueNumber)).rejects.toBe(
      `Cant load issue comment`,
    );
  });
});

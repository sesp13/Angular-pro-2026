import { TestBed } from '@angular/core/testing';
import { IssuesService } from './IssuesService..service';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { State } from '../interfaces';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // ✅ faster failure tests
    },
  },
});

describe('IssuesService', () => {
  let service: IssuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTanStackQuery(queryClient)],
    });
    service = TestBed.inject(IssuesService);
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create with default values', () => {
    expect(service.selectedState()).toBe(State.All);
    expect(service.selectedLabels()).toEqual(new Set());
    expect(service.labelsQuery.isLoading()).toBe(true);
    expect(service.issuesQuery.isLoading()).toBe(true);
  });

  it('should set selected labels', () => {
    const label = 'Accessibility';
    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(true);

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(false);
  });

  it('should set selected state OPEN, CLOSED, ALL', () => {
    const newState = State.Closed;

    service.showIssuesByState(newState);
    expect(service.selectedState()).toBe(newState);
  });

  it('should resolve labelsQuery when is called', async () => {
    expect(service.labelsQuery.status()).toBe('pending');

    const { data, status } = await service.labelsQuery.refetch();
    TestBed.tick();

    expect(status).toBe('success');
    expect(data?.length).toBe(30);

    const label = data?.at(1);
    expect(typeof label?.id).toBe('number');
    expect(typeof label?.url).toBe('string');
  });

  it('should set selectedLabels and get issues by label', async () => {
    const myLabel = 'Accessibility';

    service.toggleLabel(myLabel);
    expect(service.selectedLabels().has(myLabel)).toBe(true);
    TestBed.tick();

    const { data, status } = await service.issuesQuery.refetch();
    expect(status).toBe('success');

    data?.forEach((issue) => {
      const hasLabel = issue.labels.some((label) => label.name === myLabel);
      expect(hasLabel).toBe(true);
    });
  });
});

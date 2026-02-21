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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create with default values', () => {
    expect(service.selectedState()).toBe(State.All);
    expect(service.selectedLabels()).toEqual(new Set());
    expect(service.labelsQuery.isLoading()).toBe(true);
    expect(service.issuesQuery.isLoading()).toBe(true);
  });
});

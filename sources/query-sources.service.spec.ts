import { TestBed, inject } from '@angular/core/testing';

import { QuerySourcesService } from './query-sources.service';

describe('QuerySourcesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuerySourcesService]
    });
  });

  it('should be created', inject([QuerySourcesService], (service: QuerySourcesService) => {
    expect(service).toBeTruthy();
  }));
});

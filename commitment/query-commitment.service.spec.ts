import { TestBed, inject } from '@angular/core/testing';

import { CommitmentQueryService } from './query-commitment.service';

describe('QueryCommitmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommitmentQueryService]
    });
  });

  it('should be created', inject([CommitmentQueryService], (service: CommitmentQueryService) => {
    expect(service).toBeTruthy();
  }));
});

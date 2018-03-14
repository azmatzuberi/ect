import { TestBed, inject } from '@angular/core/testing';

import { CreateCommitmentService } from './create-commitment.service';

describe('CreateCommitmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCommitmentService]
    });
  });

  it('should be created', inject([CreateCommitmentService], (service: CreateCommitmentService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { StatementQueryService } from './statement-query.service';

describe('StatementQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatementQueryService]
    });
  });

  it('should be created', inject([StatementQueryService], (service: StatementQueryService) => {
    expect(service).toBeTruthy();
  }));
});

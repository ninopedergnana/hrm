import { TestBed } from '@angular/core/testing';

import { WordComparisonService } from './word-comparison.service';

describe('WordComparisonService', () => {
  let service: WordComparisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordComparisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InterdictNavService } from './interdict-nav.service';

describe('InterdictNavService', () => {
  let service: InterdictNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterdictNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

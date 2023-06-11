import { TestBed } from '@angular/core/testing';

import { InterdictPrivateNavService } from './interdict-private-nav.service';

describe('InterdictNavService', () => {
  let service: InterdictPrivateNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterdictPrivateNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

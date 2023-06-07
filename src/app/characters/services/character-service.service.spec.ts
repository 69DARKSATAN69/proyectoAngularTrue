import { TestBed } from '@angular/core/testing';

import { CharacterServiceService } from './character-service.service';

describe('CharacterServiceService', () => {
  let service: CharacterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

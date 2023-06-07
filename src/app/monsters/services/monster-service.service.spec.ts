import { TestBed } from '@angular/core/testing';

import { MonsterServiceService } from './monster-service.service';

describe('MonsterServiceService', () => {
  let service: MonsterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonsterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

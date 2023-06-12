import { TestBed } from '@angular/core/testing';

import { MagicInterceptor } from './magic.interceptor';

describe('MagicInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MagicInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MagicInterceptor = TestBed.inject(MagicInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

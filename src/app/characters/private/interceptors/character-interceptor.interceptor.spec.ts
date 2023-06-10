import { TestBed } from '@angular/core/testing';

import { CharacterInterceptorInterceptor } from './character-interceptor.interceptor';

describe('CharacterInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CharacterInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CharacterInterceptorInterceptor = TestBed.inject(CharacterInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

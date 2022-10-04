import { TestBed } from '@angular/core/testing';

import { SpinnerInterceptorInterceptor } from './spinner-interceptor.interceptor';

describe('SpinnerInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpinnerInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpinnerInterceptorInterceptor = TestBed.inject(SpinnerInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

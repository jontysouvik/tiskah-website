import { TestBed, inject } from '@angular/core/testing';

import { DelayService } from './delay.service';

describe('DelayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DelayService]
    });
  });

  it('should be created', inject([DelayService], (service: DelayService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { BaseURLServiceService } from './base-urlservice.service';

describe('BaseURLServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseURLServiceService = TestBed.get(BaseURLServiceService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { GetSettingsService } from './get-settings.service';

describe('GetSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSettingsService = TestBed.get(GetSettingsService);
    expect(service).toBeTruthy();
  });
});

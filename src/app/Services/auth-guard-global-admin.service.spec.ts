import { TestBed } from '@angular/core/testing';

import { AuthGuardGlobalAdminService } from './auth-guard-global-admin.service';

describe('AuthGuardAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardGlobalAdminService = TestBed.get(AuthGuardGlobalAdminService);
    expect(service).toBeTruthy();
  });
});

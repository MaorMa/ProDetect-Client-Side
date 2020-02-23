import { TestBed } from '@angular/core/testing';

import { AuthGuardAdminService } from './auth-guard-admin.service';

describe('AuthGuardLocalAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardAdminService = TestBed.get(AuthGuardAdminService);
    expect(service).toBeTruthy();
  });
});

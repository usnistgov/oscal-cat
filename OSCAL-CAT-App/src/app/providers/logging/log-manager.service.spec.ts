import { TestBed } from '@angular/core/testing';

import { LogManagerService } from './log-manager.service';

describe('LogManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogManagerService = TestBed.get(LogManagerService);
    expect(service).toBeTruthy();
  });
});

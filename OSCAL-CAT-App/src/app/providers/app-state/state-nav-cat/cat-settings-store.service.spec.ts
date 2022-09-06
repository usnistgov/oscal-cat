/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CatSettingsStoreService } from './cat-settings-store.service';

describe('Service: CatSettingsStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatSettingsStoreService]
    });
  });

  it('should ...', inject([CatSettingsStoreService], (service: CatSettingsStoreService) => {
    expect(service).toBeTruthy();
  }));
});

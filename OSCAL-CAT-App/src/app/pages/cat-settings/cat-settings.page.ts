import { Component, OnInit } from '@angular/core';
import { CatSettingsStoreService, StorePersistedSettings } from 'src/app/providers/app-state/state-nav-cat/cat-settings-store.service';
import { CookiePersistedSettings, CookiesHandlerService } from 'src/app/providers/app-state/state-nav-cat/state-cookies.service';
@Component({
  selector: 'app-cat-settings',
  templateUrl: './cat-settings.page.html',
  styleUrls: ['./cat-settings.page.scss'],
})
export class CatSettingsPage implements OnInit {

  asyncEntries: Promise<Array<StorePersistedSettings>>;
  entries: Array<StorePersistedSettings>;

  constructor(private storageService: CatSettingsStoreService
  ) {
    this.entries = storageService.getSettings();
    storageService.refreshSettings();
    console.log(this.entries);
  }

  ngOnInit(): void {
  }
}

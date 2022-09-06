/*
 * Portions of this software was developed by employees of the National Institute
 * of Standards and Technology (NIST), an agency of the Federal Government and is
 * being made available as a public service. Pursuant to title 17 United States
 * Code Section 105, works of NIST employees are not subject to copyright
 * protection in the United States. This software may be subject to foreign
 * copyright. Permission in the United States and in foreign countries, to the
 * extent that NIST may hold copyright, to use, copy, modify, create derivative
 * works, and distribute this software and its documentation without fee is hereby
 * granted on a non-exclusive basis, provided that this notice and disclaimer
 * of warranty appears in all copies.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS' WITHOUT ANY WARRANTY OF ANY KIND, EITHER
 * EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTY
 * THAT THE SOFTWARE WILL CONFORM TO SPECIFICATIONS, ANY IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND FREEDOM FROM
 * INFRINGEMENT, AND ANY WARRANTY THAT THE DOCUMENTATION WILL CONFORM TO THE
 * SOFTWARE, OR ANY WARRANTY THAT THE SOFTWARE WILL BE ERROR FREE.  IN NO EVENT
 * SHALL NIST BE LIABLE FOR ANY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DIRECT,
 * INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES, ARISING OUT OF, RESULTING FROM,
 * OR IN ANY WAY CONNECTED WITH THIS SOFTWARE, WHETHER OR NOT BASED UPON WARRANTY,
 * CONTRACT, TORT, OR OTHERWISE, WHETHER OR NOT INJURY WAS SUSTAINED BY PERSONS OR
 * PROPERTY OR OTHERWISE, AND WHETHER OR NOT LOSS WAS SUSTAINED FROM, OR AROSE OUT
 * OF THE RESULTS OF, OR USE OF, THE SOFTWARE OR SERVICES PROVIDED HEREUNDER.
 */
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { KvServiceBase } from './state-kv-base.service';
import { Storage } from '@ionic/storage';
import { NamedSessionNodes } from './state-session-data.service';


export class StorePersistedSettings {
  title: string;
  toolTip: string;
  saveButtonTitle: string;
  unitName?: string;

  storedName: string;
  expirationDays?: number;
  valueUnit?: string | undefined;
  value?: string | number | boolean;
  firstValue: string | number | boolean;
}



@Injectable({
  providedIn: 'root'
})
export class CatSettingsStoreService extends KvServiceBase {

  private getThisStoreKeyName(name: string = CatSettingsStoreService.entityStoredName): string {
    const keyName = `${NamedSessionNodes.OSCAL_CAT_SETTINGS}-${name}`;
    return keyName;
  }
  private isUpdated: boolean;
  private static entityStoredName = 'OSCAL-CAT-Application-Config-Values';
  private static storedSettings: Array<StorePersistedSettings> = [
    {
      storedName: 'cat-expiration-hours',
      expirationDays: 180,
      firstValue: 12,
      value: 8,

      title: 'Offer to Update Catalogs, Profiles, and Schemas in:',
      toolTip: '',
      saveButtonTitle: 'Save Expiration Interval',
      unitName: 'hours',
    },
    {
      storedName: 'cat-is-demo-flag',
      expirationDays: 180,
      firstValue: false,
      value: true,

      title: 'Extend Functionality in Meta for Demo:',
      toolTip: 'Extends Demo Functionality to save Typing',
      saveButtonTitle: 'Save Demo Flag',
    },
  ];


  constructor(
    public theStorage: Storage,
    public platform: Platform,
  ) {
    super(theStorage, platform);
    this.init().then(
      () => {
        // this.storage.clear().then(x => { return; });
        this.refreshSettings();
      }
    );
  }

  async init() {
    // Must make sure that database is created
    const store = await this.storage.create();
    this.storage = store;
  }

  getSettings(): Array<StorePersistedSettings> {
    return CatSettingsStoreService.storedSettings;
  }

  refreshSettings() {
    this.isUpdated = false;
    if (!this.isKeyValuePresent(this.getThisStoreKeyName())) {
      console.log('NO DATA yet!!! Saving All Settings!!!');
      this.saveAllSettings();
    } else {
      console.log('DATA EXISTS!!! Refreshing !!!');

      const storeValues = this.readAllSettings() // Async data pull from Storage as Promise

      storeValues.then(
        (data: Array<StorePersistedSettings>) => {
          // console.log(`DATA::`);
          // console.log(data);
          if (data && data.length > 0) {
            data.forEach(

              (info: StorePersistedSettings) => {
                const itemIndex = this.getIndexByName(info.storedName);
                const str_value = info.value;

                if (itemIndex >= 0 && str_value && str_value != '') {
                  // console.log(`Found Stored Value ${info.storedName} = [${str_value}]`);
                  switch (typeof (CatSettingsStoreService.storedSettings[itemIndex].firstValue)) {
                    case ('number'):
                      CatSettingsStoreService.storedSettings[itemIndex].value = Number(str_value);
                    case ('boolean'):
                      CatSettingsStoreService.storedSettings[itemIndex].value = Boolean(str_value);
                    default:
                      CatSettingsStoreService.storedSettings[itemIndex].value = str_value;
                  }
                } else {
                  const itemIndex = this.getIndexByName(info.storedName);
                  // console.log(`[${info.storedName}]-Not Found`);
                  // console.log(itemIndex);
                  if (itemIndex > 0) {
                    CatSettingsStoreService.storedSettings[itemIndex].value = CatSettingsStoreService.storedSettings[itemIndex].firstValue;
                  }
                }
              }
            );
          }
          this.isUpdated = true;
        });
    }
  }

  isComplete(): boolean {
    return this.isUpdated;
  }

  private saveAllSettings() {
    // console.log(`Saving Settings`);
    // console.log(CatSettingsStoreService.storedSettings);

    this.setKeyValueObject<Array<StorePersistedSettings>>(
      this.getThisStoreKeyName(), // The Key-Name
      CatSettingsStoreService.storedSettings // The Value
    )
      .then((x: Array<StorePersistedSettings>) => {
        // console.log(x);
        // console.log(CatSettingsStoreService.storedSettings);
        return;
      })
      .catch((error) => { console.log(error); });
  }

  readAllSettings(): Promise<Array<StorePersistedSettings>> {
    const entityName = this.getThisStoreKeyName();
    let retValue: Array<StorePersistedSettings>;
    return this.getKeyValueObject<Array<StorePersistedSettings>>(entityName)
    // .then(
    //   value => {
    //     retValue = value;
    //     console.log(retValue);
    //   }
    // )
  }


  getSettingsValue(info: StorePersistedSettings): string | number | boolean {
    const str_value = this.getKeyValue(info.storedName).then(
      str_value => {
        if (str_value != '') {
          switch (typeof (info.firstValue)) {
            case ('number'):
              info.value = Number(str_value);
            case ('boolean'):
              info.value = Boolean(str_value);
            default:
              info.value = str_value;
          }
        }
      }
    );
    if (!info.value) info.value = info.firstValue;
    return info.value;
  }

  getStoredItem(info: StorePersistedSettings): StorePersistedSettings {
    const index = CatSettingsStoreService.storedSettings.findIndex((x: StorePersistedSettings) => { return x.storedName === info.storedName; });
    return CatSettingsStoreService.storedSettings[index];
  }

  getItemByName(name: string): StorePersistedSettings {
    const index = CatSettingsStoreService.storedSettings.findIndex(
      (x: StorePersistedSettings) => {
        return x.storedName === name;
      });
    return CatSettingsStoreService.storedSettings[index];
  }

  getIndexByName(name: string): number {
    // console.log(name);
    // console.log(CatSettingsStoreService.storedSettings);
    return CatSettingsStoreService.storedSettings.findIndex(
      (x: StorePersistedSettings) => {
        return x.storedName === name;
      });
  }


  setStorageValue(info: StorePersistedSettings) {
    const index = this.getIndexByName(info.storedName);
    // console.log(index);
    if (index >= 0) {
      CatSettingsStoreService.storedSettings[index].value = info.value;
      this.saveAllSettings();
      this.refreshSettings();
      // console.log(CatSettingsStoreService.storedSettings);
    } else {
      console.log(`Index Was not Found for [${info.storedName}]`)
    }
  }

}

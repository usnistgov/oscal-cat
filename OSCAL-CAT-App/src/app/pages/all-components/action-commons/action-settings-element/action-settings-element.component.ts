import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, IonInput } from '@ionic/angular';
import { CatSettingsStoreService, StorePersistedSettings } from 'src/app/providers/app-state/state-nav-cat/cat-settings-store.service';

@Component({
  selector: 'oscal-settings-element',
  templateUrl: './action-settings-element.component.html',
  styleUrls: ['./action-settings-element.component.scss'],
})
export class ActionSettingsElementComponent implements OnInit {

  @Input() storeEntry: StorePersistedSettings;
  fallBack: StorePersistedSettings;
  value: string | number | boolean;
  // @Input() title: string;
  // @Input() buttonTitle: string;
  // @Input() toolTip?: string;
  // @Input() cookieName?: string;
  // @Input() unitName?: string;

  // value: string;

  @ViewChild("valueStr") valueStr: IonInput;
  @ViewChild("valueNum") valueNum: IonInput;
  @ViewChild("valueBin") valueBin: IonCheckbox;


  constructor(public storeService: CatSettingsStoreService) {

  }

  ngOnInit() {
    // Load the value from cookies
    this.value = this.storeEntry.value;
    console.log(this.storeEntry.value);
  }

  getUnitName(): string {
    return this.storeEntry.unitName || undefined;
  }

  getTitle(): string {
    return this.storeEntry.title || `Setting`
  }

  getToolTip(): string {
    return this.storeEntry.toolTip || ``;
  }

  getButtonTitle(): string {
    return this.storeEntry.saveButtonTitle || `Save Row Setting`;
  }

  getValue() {
    const item = this.storeService.getItemByName(this.storeEntry.storedName);
    this.value = item ? item.value : '';
    return this.value;
  }

  onClick() {
    // Save the value into cookies
    console.log(this.valueBin);
    console.log(this.valueNum);
    console.log(this.valueStr);
    console.log(this.value);

    if (this.isBoolean()) {
      this.storeEntry.value = Boolean(this.valueBin.checked);
      this.value = Boolean(this.valueBin.checked);
      this.storeService.setStorageValue(this.storeEntry);
    }

    else if (this.isNumber()) {
      this.storeEntry.value = Number(this.valueNum.value);
      this.value = Number(this.valueNum.value);
      this.storeService.setStorageValue(this.storeEntry);
    }

    else if (this.isString()) {
      this.storeEntry.value = String(this.valueStr.value);
      this.value = String(this.valueStr.value);
      this.storeService.setStorageValue(this.storeEntry);
    }
    console.log(this.storeEntry.value);
    console.log(this.value);
  }

  isBoolean(): boolean {
    return 'boolean' == typeof (this.storeEntry.firstValue);
  }

  isString(): boolean {
    return 'string' == typeof (this.storeEntry.firstValue);
  }

  isNumber(): boolean {
    return 'number' == typeof (this.storeEntry.firstValue);
  }



}

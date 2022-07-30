import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { OscalCatalogEmpties } from 'src/app/interfaces/oscal-types/oscal-catalog-factory';
import { Address } from 'src/app/interfaces/oscal-types/oscal-catalog.types';

import { ActionAncestorBaseComponent } from '../action-ancestor-base/action-ancestor-base.component';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { ArrayStringsComponent } from '../action-array-strings/action-array-strings.component';

@Component({
  selector: 'app-action-array-address-ops',
  templateUrl: './action-array-address-ops.component.html',
  styleUrls: ['./action-array-address-ops.component.scss'],
})
export class ArrayAddressComponent extends ActionAncestorSimpleArrayComponent implements OnInit {


  @Input() public addressParentName: string;
  @Input() addressList: Array<Address>;

  @Output() public closeTab: EventEmitter<Address>;
  @Output() public saveTab: EventEmitter<Address>;

  @ViewChild('linesArray') emailsArray: ArrayStringsComponent;


  // Does most of the things via the base class
  constructor(public formBuilder: FormBuilder, public parentFormDirect: FormGroupDirective) {
    super(formBuilder, parentFormDirect);
  }

  private buildInputsMap() {
    this.inputsMap.set('1-Type',
      {
        fieldToMap: 'type',
        labelName: 'Address Type',
        inputTip: 'Indicates the type of address.',
      });
    this.inputsMap.set('2 - Contact/Attention + Street/Building + Office/Apartment',
      {
        fieldToMap: 'addrLines',
        labelName: 'Address Lines',
        inputTip: 'THe lines may include Organization Name/Person Name/Attention of + Street Name/Building Number + Office/Apartment etc.',
        complexInputType: true,
        inputAs: 'oscal-strings-list',
      });
    this.inputsMap.set('3-City Name',
      {
        fieldToMap: 'city',
        labelName: 'City Name',
        inputTip: 'City, town or geographical region for the mailing address.',
      });
    this.inputsMap.set('4-State/Province/Region Name',
      {
        fieldToMap: 'state',
        labelName: 'State/Province/Region',
        inputTip: 'State, province or analogous geographical region for mailing address',
      });
    this.inputsMap.set('5-ZIP/Postal Code',
      {
        fieldToMap: 'postalCode',
        labelName: 'Postal (ZIP) Code',
        inputTip: 'Postal or ZIP code for mailing address',
      });
    this.inputsMap.set('6-Country Name',
      {
        fieldToMap: 'country',
        labelName: 'Country',
        inputTip: 'The ISO 3166-1 alpha-2 country code for the mailing address.',
      });
    this.defaultPluralTitle = 'Addresses';
    this.defaultSingleTitle = 'Address';
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildInputsMap();
    if (!this.addressList) {
      this.addressList = new Array<Address>()
    }
  }

  onAddAddress() {
    this.addressList.push(OscalCatalogEmpties.getEmptyAddress());
  }

}

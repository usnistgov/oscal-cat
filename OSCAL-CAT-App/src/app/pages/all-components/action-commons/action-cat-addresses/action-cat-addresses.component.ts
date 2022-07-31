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

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';
import { OscalCatalogEmpties } from 'src/app/interfaces/oscal-types/oscal-catalog-factory';
import { Address } from 'src/app/interfaces/oscal-types/oscal-catalog.types';

import { ActionAncestorBaseComponent } from '../action-ancestor-base/action-ancestor-base.component';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { ArrayStringsComponent } from '../action-array-strings/action-array-strings.component';

@Component({
  selector: 'oscal-cat-addresses',
  templateUrl: './action-cat-addresses.component.html',
  styleUrls: ['./action-cat-addresses.component.scss'],
})
export class OscalCatAddressesComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

  getNewFormGroup<Type>() {
    throw new Error('Method not implemented.');
  }
  getControlsArray<Type>() {
    throw new Error('Method not implemented.');
  }


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

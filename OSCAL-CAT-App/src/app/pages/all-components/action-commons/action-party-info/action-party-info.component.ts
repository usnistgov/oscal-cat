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
import { ArrayPhonesComponent } from './../action-array-phones/action-array-phones.component';
import { ArrayAddressesComponent } from '../action-array-addresses/action-array-addresses.component';
import {
  AfterViewInit, Component, EventEmitter,
  Input, OnInit, Output, ViewChild, ViewChildren, ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { v4 as UUIDv4 } from 'uuid';


import { CloseAddEdit } from '../../meta-info/meta-info.component';
import { LogManagerService } from './../../../../providers/logging/log-manager.service';
import { PartyOrganizationOrPerson, PartyType, Address } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { ArrayStringsComponent } from '../action-array-strings/action-array-strings.component';
import { ArrayLinksComponent } from '../action-array-links/action-array-links.component';
import { ArrayExternalIDsComponent } from '../action-array-external-ids/action-array-external-ids.component';
import { PropertiesArrayComponent } from '../action-array-properties/action-array-properties.component';
export enum EntityTypeIcons {
  Person = 'body-outline',
  Party = 'beer-outline',
  Organization = 'business-outline',
}

@Component({
  selector: 'oscal-act-party-info',
  templateUrl: './action-party-info.component.html',
  styleUrls: [
    './action-party-info.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class ActionPartyInfoComponent implements OnInit, AfterViewInit {

  @Input() public parentForm: FormGroup;

  @Input() public controlID: string;
  @Input() public theParent: CloseAddEdit;
  @Input() public isModal: boolean;
  @Input() public hideTitle: boolean;
  @Input() public createNew: boolean;
  @Input() public addressName: string;
  @Input() public entryName: string;
  @Input() public partyInfo: PartyOrganizationOrPerson;
  @Input() public iconName: string;
  @Input() public actionName: string;

  @Output() public closeTab: EventEmitter<PartyOrganizationOrPerson> = new EventEmitter<PartyOrganizationOrPerson>();
  @Output() public saveTab: EventEmitter<PartyOrganizationOrPerson> = new EventEmitter<PartyOrganizationOrPerson>();


  @ViewChild('phonesList') phonesListUI: ArrayPhonesComponent;
  @ViewChild('emailsList') emailsListUI: ArrayStringsComponent;
  @ViewChild('addressList') addressListUI: ArrayAddressesComponent;
  @ViewChild('organizationsList') organizationsListUI: ArrayStringsComponent;
  @ViewChild('linksList') linksListUI: ArrayLinksComponent;
  @ViewChild('uuidsList') uuidsListUI: ArrayStringsComponent;
  @ViewChild('extIdsList') externalListUI: ArrayExternalIDsComponent;
  @ViewChild('propsList') propsListUI: PropertiesArrayComponent;

  rootForm: FormGroup;
  localForm: FormGroup;
  saveIcon: string;
  x_addressList: Array<Address>;


  // @ViewChild('addEditAddress', { static: true, read: ViewContainerRef }) public AddressVCR: ViewContainerRef;
  // loadedAddressComponents = [];

  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public parentFormDirect: FormGroupDirective,
    public LMS: LogManagerService) {
    // Hook up to the parent control's Form
    this.rootForm = this.parentFormDirect.form;
  }

  isSaveAllowed(): boolean {
    return this.createNew ? this.localForm.valid : true;
  }


  ngAfterViewInit() {
    // this.partyInfo.addresses
    // this.partyInfo.emailAddresses
    // this.partyInfo.memberOfOrganizations
    // this.partyInfo.links
    // this.partyInfo.locationUuids
  }


  ngOnInit() {
    this.saveIcon = !!this.iconName ? this.iconName : 'save-outline';
    this.iconName = !!this.iconName ? this.iconName : 'people-outline';
    console.log(`->actionName = ${this.actionName}\n->createNew = ${this.createNew}\n->Icon='${this.iconName}'\n->EntryName=${this.entryName}`);
    console.log(`Party Info = ${this.partyInfo}`);
    console.log(`Entity-Type=${this.partyInfo.type}`);

    this.x_addressList = !!this.partyInfo ? this.partyInfo.addresses : new Array<Address>();

    console.log(`Done with onInit`);
    // this.LMS.logData(this.formFields.get('emailAddresses').value);
    // this.LMS.logData(this.formFields.get('emailAddresses'));
    this.partyInfo.emailAddresses = this.coalesceEmptyArray<string>(this.partyInfo.emailAddresses);
    this.partyInfo.addresses = this.coalesceEmptyArray<Address>(this.partyInfo.addresses);

    this.localForm = this.formBuilder.group({
      partyName: [this.partyInfo.name,
      Validators.compose([Validators.maxLength(200), Validators.required]),
      ],
      shortName: [this.partyInfo.shortName,
      Validators.compose([Validators.maxLength(100)]),
      ],
      uuid: [this.partyInfo.uuid,
      Validators.compose([Validators.required]),
      ],
      remarks: [this.partyInfo.remarks,
      Validators.compose([Validators.maxLength(1024)]),
      ],
      type: [this.partyInfo.type,
      Validators.compose([Validators.required]),
      ],
      emailAddresses: this.formBuilder.array(
        this.getEmailsArray(this.partyInfo.emailAddresses)
      ),
      // addresses: this.formBuilder.array(
      //   this.getAddressesArray(this.partyInfo.addresses)
      // ), // this.getEmailsGroup(this.partyInfo.emailAddresses)
      addresses: this.formBuilder.array(this.getAddressesArray(this.partyInfo.addresses)),
    });

    this.rootForm.addControl('newEntry', this.localForm);
  }

  coalesceEmptyArray<Type>(theArray: Array<Type>): Array<Type> {
    return theArray || new Array<Type>();
  }

  getActualPartyName(): string {
    const name = this.localForm.get('partyName').value;
    const type = (this.entryName === 'Organization') ? 'Organization' : 'Person';
    return (!!name) ? name : type;
  }

  typeChanged(event, newValue?: string) {
    this.partyInfo.type = event.detail.value as PartyType;
    const selectedName = (event.detail.value as string);
    console.log(`Ret=${event.detail} Str=${selectedName} PT=${this.partyInfo.type}`);
    this.entryName = selectedName.charAt(0).toUpperCase() + selectedName.slice(1);
    if (this.entryName === 'Organization') {
      this.iconName = EntityTypeIcons.Organization as string;
    } else if (this.entryName === 'Person') {
      this.iconName = EntityTypeIcons.Person as string;
    } else {
      this.iconName = EntityTypeIcons.Party as string;
    }
    // console.log(`this.partyInfo.type=${this.partyInfo.type}`);
  }

  getActionEntityTitle(): string {
    if (!this.actionName || !['Add', 'Edit'].some(x => x === this.actionName)) {
      return this.createNew ? 'Adding '.concat(this.entryName) : 'Editing '.concat(this.entryName);
    }
    return this.actionName.concat('ing ', this.entryName);
  }

  getEmailValidator(): Validators {
    return Validators.email;
  }

  getEmailsArray(emails: Array<string>): Array<FormGroup> {
    const controlArray = new Array<FormGroup>();
    emails.forEach((element: string, index: number) => {
      // groupObject['email_' + index.toString()] = [element, Validators.email];
      controlArray.push(this.formBuilder.group({ email: [element, Validators.email] }));
    });
    console.log(`Emails Group Object`);
    // this.LMS.logData(controlArray);
    return controlArray;
  }

  onAddEmail(element = '') {
    const theValue = element || '';
    this.partyInfo.emailAddresses.push(theValue);
    const items = this.localForm.get('emailAddresses') as FormArray;
    items.push(this.formBuilder.group({ email: [theValue, Validators.email] }));
  }

  onRemoveEmail(i: number) {
    const items = this.localForm.get('emailAddresses') as FormArray;
    items.controls.splice(i, 1); // Remove array element
    // this.formFields.patchValue({
    //   emailAddresses: this.formBuilder.array(this.getEmailsArray(this.partyInfo.emailAddresses))
    // });
  }

  getAddressesArray(addresses: Array<Address>): Array<FormGroup> {
    addresses = addresses || new Array<Address>();
    const controlArray = new Array<FormGroup>();
    addresses.forEach((theAddress: Address, index: number) => {
      // groupObject['email_' + index.toString()] = [element, Validators.email];
      controlArray.push(this.formBuilder.group({ address: [theAddress] }));
    });
    console.log(`Addresses Group Object`);
    this.LMS.logData(controlArray);
    return controlArray;
  }

  onAddAddress(element: Address = null) {
    const emptyAddress: Address = {
      city: 'New York',
      country: 'Our Great One',
      addrLines: new Array<string>(),
      postalCode: '12345',
      state: '',
      type: '',
    };
    const theValue = element || emptyAddress;
    this.partyInfo.addresses.push(theValue);
    const items = this.localForm.get('addresses') as FormArray;
    items.push(this.formBuilder.group({ address: [theValue] }));

    // const componentFactory = this.CFR.resolveComponentFactory(AddressFormComponent);
    // const addressRef = this.AddressVCR.createComponent(componentFactory);
    // addressRef.instance.addressData = theValue;
    // this.loadedAddressComponents.push(addressRef);
  }

  onRemoveAddress(i: number) {
    const items = this.localForm.get('addresses') as FormArray;
    items.controls.splice(i, 1);
  }

  onAssignUUID() {
    this.localForm.patchValue({ uuid: UUIDv4() });
  }

  onCancelButton() {
    if (this.isModal) {
      this.modalController.dismiss();
    } else {
      this.closeTab.emit(undefined);
      // this.theParent.closeAddEditPOoP(this.controlID, false, undefined);
    }
  }

  onSubmitData() {
    const data: PartyOrganizationOrPerson = {
      name: this.localForm.get('partyName').value,
      shortName: this.localForm.get('shortName').value,
      type: this.partyInfo.type,
      uuid: this.localForm.get('uuid').value,
      remarks: this.localForm.get('remarks').value,
    };
    data.addresses = this.addressListUI.formCommitArray();
    data.links = this.linksListUI.formCommitArray();
    data.emailAddresses = this.emailsListUI.formCommitArray();
    data.externalIDS = this.externalListUI.formCommitArray();
    data.locationUuids = this.uuidsListUI.formCommitArray();
    data.memberOfOrganizations = this.organizationsListUI.formCommitArray();
    data.telephoneNumbers = this.phonesListUI.formCommitArray();
    data.props = this.propsListUI.formCommitArray();
    this.saveTab.emit(data);

    /*
    // Remote chance to use it in modal for ad-on edits
    if (this.isModal) {
      this.modalController.dismiss(data);
    } else {
      this.theParent.closeAddEditPOoP(this.controlID, true, data);
    }
    */

  }

}

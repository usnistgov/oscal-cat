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

import {
  AfterViewInit, ChangeDetectionStrategy, Component, ComponentFactoryResolver,
  Input, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ModalController, IonDatetime } from '@ionic/angular';
import { ActionPartyInfoComponent } from '../action-commons/action-party-info/action-party-info.component';
import { v4 as UUIDv4 } from 'uuid';

import { LogManagerService } from './../../../providers/logging/log-manager.service';
import { OscalCatalogEmpties } from './../../../interfaces/oscal-types/oscal-catalog-factory';

import { ArrayLinksComponent } from '../action-commons/action-array-links/action-array-links.component';
import { LocationsArrayComponent } from '../action-commons/action-array-locations/action-array-locations.component';
import { LocationInfoComponent } from '../action-commons/action-location-info/action-location-info.component';
import { ActionArrayRolesComponent } from '../action-commons/action-array-roles/action-array-roles.component';

// import { AppDbInProgressService } from '../../info-providers/app-state/app-db-sqlite/app-db-in-progress.service';
// import { PartyExternalIdentifier, } from './../../../interfaces/oscal-types/oscal-catalog.types';
// import { AppDbKvInProgressService } from './../../../info-providers/app-state/app-db-kv-storage-cap/app-db-in-progress.service';
import {
  Address, PublicationMetadata, PartyOrganizationOrPerson, PartyType,
  Link, TelephoneNumber, ResponsibleParty, Property,
  DocumentIdentifier, Location, Role
} from './../../../interfaces/oscal-types/oscal-catalog.types';
import {
  CurrentSessionData, NamedSessionNodes, SessionData
} from './../../../providers/app-state/state-nav-cat/state-session-data.service';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';

export interface CloseAddEdit {
  closeAddEditPOoP: (controlKey: string, isValid: boolean, returnObject: PartyOrganizationOrPerson) => any;
  closeAddEditResponsible: (controlKey: string, isValid: boolean, returnObject: { [key: string]: ResponsibleParty }) => any;
  closeAddEditDocId: (controlKey: string, isValid: boolean, returnObject: DocumentIdentifier) => any;
  closeAddEditProperty: (controlKey: string, isValid: boolean, returnObject: Property) => any;
  closeAddEditLink: (controlKey: string, isValid: boolean, returnObject: Link) => any;
  closeAddEditLocation: (controlKey: string, isValid: boolean, returnObject: Location) => any;
  closeAddEditRole: (controlKey: string, isValid: boolean, returnObject: Role) => any;
}

export enum EditingState {
  Off = '',
  Party = 'Editing Party',
  Role = 'Editing Role',
  RespParty = 'Editing Responsible Party',
  DocID = 'Editing Document ID',
  Link = 'Editing Link',
  Property = 'Editing Property',
  Location = 'Editing Location',
}

@Component({
  selector: 'oscal-meta-info',
  templateUrl: './meta-info.component.html',
  styleUrls: [
    './meta-info.component.scss',
    '../action-all-common/act-styles.scss',
    '../action-all-common/ion-tabs-buttons.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaInfoComponent implements OnInit, AfterViewInit, CloseAddEdit {
  /// The template Holder and accountability array of the loaded controls/components


  @ViewChild('addEditData', { static: true, read: ViewContainerRef }) public VCR: ViewContainerRef;
  loadedComponents = [];
  @ViewChild('addEditData2', { static: true, read: ViewContainerRef }) public VCR2: ViewContainerRef;
  loadedComponents2 = [];

  @ViewChild('entityTab') entityTab: ActionPartyInfoComponent;
  @ViewChild('roleTab') roleTab: ActionArrayRolesComponent;
  @ViewChild('linkTab') linkTab: ArrayLinksComponent;
  @ViewChild('locationsTab') locationsTab: LocationsArrayComponent;
  @ViewChild('locationTab') locationTab: LocationInfoComponent;
  @ViewChild('propertyTab') propertyTab: LocationsArrayComponent;
  @ViewChild('popoverDatetime', { static: true }) popoverDatetimeValue: IonDatetime;

  private formBuilder: FormBuilder;
  public autoUpdateDates = false;
  // private db: AppDbInProgressService;

  /* 
    // The overall structure of the metadata in TypeScript form
    documentIDS?: DocumentIdentifier[];
    +!!! lastModified: Date;
    links?: Link[];
    locations?: Location[];
    +!!! oscalVersion: string;
    ++++ parties?: PartyOrganizationOrPerson[];
    props?: Property[];
    published?: Date;
    remarks?: string;
    responsibleParties?: { [key: string]: ResponsibleParty };
    revisions?: RevisionHistoryEntry[];
    roles?: Role[];
    // A name given to the document, which may be used by a tool for display and navigation.
    +!!! title: string;
    +!!! version: string;
  */
  @Input() metaInfo: PublicationMetadata;

  activeSession: SessionData;

  activeEntityAddTabName = '';
  activeEditState: EditingState = EditingState.Off;
  activeEditIndex: number;
  metaForm: FormGroup;
  public partyNames = ['Organization', 'Person', 'Party'];
  public partyTypeName: string;
  currentEmptyParty: PartyOrganizationOrPerson;
  currentEditedParty: PartyOrganizationOrPerson;
  currentPartyIcon: string;
  currentPartyName: string;
  currentEditedRole: Role;
  defaultRoles: Array<Role>;
  currentEditedRespParty: ResponsibleParty;
  currentEditedDocId: DocumentIdentifier;
  currentEditedProperty: Property;
  currentEditedLink: Link;
  currentEditedLocation: Location;

  constructor(
    private session: CurrentSessionData,
    public modalController: ModalController,
    public LMS: LogManagerService,
    // private CFR: ComponentFactoryResolver,
    // private db: AppDbInProgressService,
  ) {

    // this.db = new AppDbInProgressService(new Platform(), new SQLite(), new HttpClient(new HttpHandler()), new SQLitePorter());

    // console.log(`x-x-x: EL = ${db.entitiesList}`);
    // console.log(`Before Async`);
    // const x = { first: 1, second: 'second' };
    // AppDbKvInProgressService.getKeyValue('v-x').resolve().then(
    //   (value) => {
    //     if (!value) {
    //       console.log(`No Value Returned`);
    //       AppDbKvInProgressService.setKeyValue('v-x', x);
    //     } else {
    //     }
    //   }
    // );
  }

  updateMetaFromSession() {
    if (this.activeSession && !this.activeSession.meta) {
      if (this.activeSession.knownCat && this.activeSession.knownCat.cat_suffix) {
        this.metaInfo.title = `Profile Based on ${this.activeSession.knownCat.cat_suffix}`;
      } else if (this.activeSession && this.activeSession.name) {
        this.metaInfo.title = this.activeSession.name;
      }
    }
  }


  initMetaInfo() {

    if (this.session.isKeyValuePresent(NamedSessionNodes.ACTIVE_SESSION)) {
      this.activeSession = this.session.ActiveSession;
      if (this.activeSession && this.activeSession.meta) {
        this.metaInfo = this.activeSession.meta;
      }
      if (this.activeSession && this.activeSession.uuid) {
        console.log(`Active-Session ID: [${this.activeSession.uuid}]`);
      }
    }

    if (!!this.metaInfo) {
      this.updateMetaFromSession();
      return;
    } else {
      this.metaInfo = {
        title: '',
        version: '',
        lastModified: new Date(),
        oscalVersion: '',
      };
      this.updateMetaFromSession();
    }

    console.log('Beginning Meta Component');
    console.log(this.metaInfo);

    this.formBuilder = new FormBuilder();
    this.metaForm = this.formBuilder.group({
      title: [this.metaInfo.title ? this.metaInfo.title : '', Validators.required],
      description: [''],
      oscalVersion: [
        '',
        Validators.compose([
          Validators.maxLength(1024),
          Validators.minLength(1),
          Validators.required,
        ]),
      ],
      version: [
        '',
        Validators.compose([
          Validators.maxLength(80),
          Validators.required,
        ]),
      ],
      last_modified_string: [
        this.formatDateLabel(new Date()),
        Validators.compose([
          Validators.required,
        ]),
      ],
      last_modified_date: [
        new Date(),
        Validators.compose([
        ]),
      ],

      // parties: (this.getPartiesControlsArray(this.metaInfo.parties)),
      // newParty: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.initMetaInfo();
    this.updateMetaFromSession();
    // this.db = new AppDbInProgressService(Platform, );

  }

  ngAfterViewInit() {
    // console.log(`@ngAfterViewInit.VCR: ${this.VCR}`);
    const a = 5;
    console.log(`A = ${a}`)
  }

  getPartiesControlsArray(theData: Array<PartyOrganizationOrPerson> = null): FormArray {
    const controlArray = new Array<FormGroup>();
    return this.formBuilder.array(controlArray);
  }

  initPlaceholders4Entry(): Array<FormGroup> {
    const empties = new Array<FormGroup>();
    const entities = ['Person', 'Party', 'Organization'];
    entities.forEach((element, index) => {
      const emptyX = OscalCatalogEmpties.getEmptyPOoP(element);

    });

    return null;
  }


  versionToString(): string {
    const ver = `${this.metaForm.controls.major.value}.${this.metaForm.controls.minor.value}`;
    return ver;
  }

  submitForm(): void {
    const ver = this.versionToString();
    this.metaInfo = {
      oscalVersion: 'current',
      title: this.metaForm.controls.title.value,
      version: ver,
      lastModified: new Date(Date.now()),
    };
  }


  formatDateLabel(originalDate: Date): string {
    return format(parseISO(format(originalDate, 'yyyy-MM-dd HH:mm')), 'MMM d, yyyy @ HH:mm (zzzz)');
  }

  setTimeToNow(): void {
    const dts = this.formatDateLabel(new Date());
    console.log(`setTimeToNow DateFormatted as: ${dts}`);
    this.metaForm.patchValue({ last_modified: dts });
  }

  patchFormatDate(dtv: string): void {
    console.log(`THe Picked Date: ${dtv}`);
    const dtValue = this.formatDateLabel(parseISO(dtv));
    this.metaForm.patchValue({ last_modified: dtValue });
  }
  confirm() {
    this.popoverDatetimeValue.confirm(true);
  }

  onUpdateLastModified() {

  }

  autoUpdateLater(): void {
    this.autoUpdateDates = !this.autoUpdateDates;
    this.setTimeToNow();
    console.log(`A-u:${this.autoUpdateDates}`);
  }

  getAutoUpdateColor(): string {
    return this.autoUpdateDates ? 'success' : 'medium';
  }

  getSelectedPartiesAsText(actorUUIDs) {
    const metaActors = this.metaInfo.parties;
    let ret = '';
    if (!!actorUUIDs) {
      const len = actorUUIDs.length;
      if (len > 0) {
        actorUUIDs.forEach((chosenUuid: string, i) => {
          const idxActor = metaActors.findIndex(e => e.uuid === chosenUuid);
          if (idxActor >= 0) {
            if (len > 1) {
              ret = ret.concat((i > 0 && len !== 2) ? ', ' : '', i === len - 1 ? ' and ' : '', metaActors[idxActor].name);
            } else {
              ret = metaActors[idxActor].name;
            }
          }
        });
        return ret;
      } else {
        return ret;
      }
    } else {
      return ret;
    }
  }


  /**
   * Presents POoP Pop-Up
   */
  async modalPOoP(typeName: string, icon: string, paramPOoP: PartyOrganizationOrPerson = null) {
    // this.addr = { state: 'MD', city: 'New Vasyuki', postalCode: '12345-6789' };
    // let v2: string | null | undefined;
    // let v3: Array<Address> = new Array<Address>();
    // v2 = 'null';
    const emptyPOoP = OscalCatalogEmpties.getEmptyPOoP(typeName);
    console.log(` New or Old = ${!paramPOoP} `);
    // this.LMS.logData(emptyPOoP);

    const modal = await this.modalController.create({
      component: ActionPartyInfoComponent,
      componentProps: {
        isModal: true,
        partyInfo: !!paramPOoP ? paramPOoP : emptyPOoP,
        createNew: !paramPOoP,
        hideTitle: false,
        entryName: typeName,
        iconName: icon,
        actionName: !!paramPOoP ? 'Edit' : 'Add',
        // cssClass: 'oscal-modal-prompt-class', // Does Not Work Like This!!!
      }
    });
    // Either of the functions works just fine
    // modal.onWillDismiss().then(
    //   (data) => {
    //     console.log(`oWD-Data = ${data}`);
    //     this.logData(data);
    //   });
    modal.onDidDismiss().then(
      (data) => {
        console.log(`oDD-Data = ${data}`);
        this.LMS.logData(data);
      });
    return await modal.present();
  }


  /**
   * Generic PopUp Dispatcher Call
   * @param popUpType: the Type of the Popup to create
   * @param mode: the mode of the pop-Up to create {editExisting, createNew}
   */
  async presentGenericPopup(popUpType: number, mode: number) {

  }

  onResetToNow() {

  }


  isPartyTabActive(): boolean {
    return this.partyNames.includes(this.activeEntityAddTabName);
  }

  isAddMapTabActive(): boolean {
    return this.activeEntityAddTabName === 'Adding Map';
  }

  isEditingParty(): boolean {
    return this.activeEditState === EditingState.Party;
  }

  isEditingRole() {
    return this.activeEditState === EditingState.Role;
  }

  isEditingRespParty() {
    return this.activeEditState === EditingState.RespParty;
  }

  showTab4POoP($event, typeName: string, icon: string, paramPOoP: PartyOrganizationOrPerson = null) {
    console.log(`$$$=>${typeName}`);
    this.currentEmptyParty = OscalCatalogEmpties.getEmptyPOoP(typeName);
    /*
     console.log(`SH-T-Name=${typeName}`);
     this.partyTypeName = typeName;
     */
    // const emptyPOoP = this.getEmptyPOoP(typeName);
    this.currentPartyIcon = icon;
    this.currentPartyName = typeName;
    this.activeEntityAddTabName = typeName;
    const setToIcon = icon || 'body-outline';
    if (!!this.entityTab) {
      this.entityTab.iconName = setToIcon;
      this.entityTab.controlID = UUIDv4();
      this.entityTab.theParent = this;
      this.entityTab.partyInfo = !!paramPOoP ? paramPOoP : this.currentEmptyParty;
      this.entityTab.entryName = typeName;  //
      this.entityTab.iconName = icon; //
      this.entityTab.actionName = !!paramPOoP ? 'Edit' : 'Add';
      // // Already In-HTML-Tag set
      // this.entityTab.createNew = !paramPOoP;
      // this.entityTab.isModal = false;
      // this.entityTab.hideTitle = true;
    }

  }

  removeArrayEntry<Type>(theEntry: Type, theArray: Array<Type>) {
    if (!!theArray) {
      const indexToRemove = theArray.indexOf(theEntry);
      // this.metaInfo.parties.indexOf(theParty);
      if (indexToRemove > -1) {
        theArray.splice(indexToRemove, 1);
      }
    } else {
      console.log(`!-!-! Array is <EMPTY>`);
    }
  }

  removeParty($event, theParty: PartyOrganizationOrPerson) {
    // Probably should ask sure or not?
    this.removeArrayEntry<PartyOrganizationOrPerson>(theParty, this.metaInfo.parties);
  }

  removeDocId($event, theDocId: DocumentIdentifier) {
    this.removeArrayEntry<DocumentIdentifier>(theDocId, this.metaInfo.documentIDS);
  }

  removeProperty($event, theProp: Property) {
    this.removeArrayEntry<Property>(theProp, this.metaInfo.props);
  }

  removeLink($event, theLink: Link) {
    this.removeArrayEntry<Link>(theLink, this.metaInfo.links);
  }

  removeLocation($event, theLocation: Location) {
    this.removeArrayEntry<Location>(theLocation, this.metaInfo.locations);
  }


  // <allowed-values id = "allowed-metadata-responsibe-party-role-ids" target = "responsible-party/@role-id" allow - other="yes" >
  //  <enum value="prepared-by" > Indicates the organization that created this content.< /enum>
  //  <enum value="prepared-for" > Indicates the organization for which this content was created.< /enum>
  //  <enum value="content-approver" > Indicates the organization responsible for all content represented in the "document".< /enum>
  // < /allowed-values>

  initDefaultRoles() {
    const preparer: Role = {
      title: 'Content Expert',
      id: 'prepared-by',
    };
    const requester: Role = {
      title: 'Content Sponsor',
      id: 'prepared-for',
    };
    const approver: Role = {
      title: 'Content Approver',
      id: 'content-approver',
    };
    this.defaultRoles = [preparer, requester, approver];
  }

  appendDefaultRoles() {
    if (!this.defaultRoles) {
      this.initDefaultRoles(); // 531.66 461.66
    }
    if (!this.metaInfo.roles) {
      this.metaInfo.roles = new Array<Role>();
      for (const role of this.defaultRoles) {
        const x: Role = { title: role.title, id: role.id, };
        this.metaInfo.roles.push(x); // Push ion the end in the original order
      }
    } else {
      for (const role of this.defaultRoles.reverse()) {
        const x: Role = { title: role.title, id: role.id, };
        this.metaInfo.roles.unshift(x); // Push at the beginning in reverse order
      }
    }
    // TODO: Remove this when not debugging
    this.addTestParties();
  }

  addTestParties() {
    // TODO: Even though it saves time testing - 
    // this functionality has to be commented out for release
    if (!this.metaInfo.parties) {
      this.metaInfo.parties = new Array<PartyOrganizationOrPerson>();
    }
    const a: PartyOrganizationOrPerson = {
      type: PartyType.Person,
      name: 'Adam',
      uuid: '11111111-1111-1111-1111-111111111111',
      remarks: 'The luckiest lump of clay ever used to make humans.',
      shortName: '1st',
    };
    const e: PartyOrganizationOrPerson = {
      type: PartyType.Person,
      name: 'Eve',
      uuid: '33333333-3333-3333-3333-333333333333',
      remarks: 'A workable second draft.',
      shortName: 'Not-1st',
    };
    const l: PartyOrganizationOrPerson = {
      type: PartyType.Person,
      name: 'Lucy',
      uuid: '66666666-6666-6666-6666-666666666666',
      remarks: 'Ruler of unfinished security and under-designed creations.',
      shortName: 'B4-1st',
    };
    const h: PartyOrganizationOrPerson = {
      type: PartyType.Organization,
      name: 'Bad.Org',
      uuid: '66666666-9999-6666-9999-666666666666',
      remarks: 'A place for the most interesting people that did not fit.',
      shortName: 'Bad',
    };
    const h2: PartyOrganizationOrPerson = {
      type: PartyType.Organization,
      name: 'Good.Org',
      uuid: '69696969-9696-6969-9696-696969696969',
      remarks: 'A place for the most boring people ever lived.',
      shortName: 'Good',
    };
    const g: PartyOrganizationOrPerson = {
      type: PartyType.Organization,
      name: 'Creator.Org',
      uuid: '00000000-0000-0000-0000-000000000000',
      remarks: 'That is the only party capable of the ideal security. Though... Lucifer....',
      shortName: 'G-d',
    };

    this.metaInfo.parties.push(a);
    this.metaInfo.parties.push(e);
    this.metaInfo.parties.push(l);
    this.metaInfo.parties.push(h);
    this.metaInfo.parties.push(h2);
    this.metaInfo.parties.push(g);

    const x: Role = { title: 'Creator', id: 'creator', };
    this.metaInfo.roles.push(x);

  }

  hasPredefinedRolesAlready(): boolean {
    return !!this.metaInfo.roles && this.metaInfo.roles.length >= 3;
  }

  isPresetRole(role: Role): boolean {
    if (!this.defaultRoles) {
      return false;
    }
    const ret = this.defaultRoles.some((e, i) => e.id === role.id && i < 3);
    // console.log(`>>> Ret-is-Preset:${ret}`);
    return ret;
  }

  isReadyToMap() {
    return this.haveParties() && this.haveRoles();
  }

  removeRole($event, theRole: Role) {
    // Probably should ask sure or not?
    const removeIndex = this.metaInfo.roles.indexOf(theRole);
    if (removeIndex > -1) {
      this.metaInfo.roles.splice(removeIndex, 1);
    }
  }

  removeResponsibleParty($event, theParty: ResponsibleParty) {
    // Probably should ask sure or not?
    const removeIndex = this.metaInfo.responsibleParties.indexOf(theParty);
    if (removeIndex > -1) {
      this.metaInfo.responsibleParties.splice(removeIndex, 1);
    }
  }

  startEntityEdit<Type>(theEntity: Type, theSourceArray: Array<Type>, theNewState: EditingState, currentEditedEntity?: Type): Type {
    this.cancelEditTab<Type>(undefined);
    currentEditedEntity = theEntity;
    this.activeEditState = theNewState;
    this.activeEditIndex = theSourceArray.indexOf(theEntity);
    return theEntity;
  }


  startPartyEdit($event, theParty: PartyOrganizationOrPerson) {

    if (!this.currentEditedParty) {
      this.currentEditedParty = theParty;
      this.startEntityEdit<PartyOrganizationOrPerson>(theParty, this.metaInfo.parties, EditingState.Party);
    } else {
      this.currentEditedParty = undefined;
      this.cancelEditTab<PartyOrganizationOrPerson>(theParty);
    }
    // this.cancelEditTab<PartyOrganizationOrPerson>(undefined);
    // this.currentEditedParty = theParty;
    // this.activeEditState = EditingState.Party;
    // this.activeEditIndex = this.metaInfo.parties.indexOf(this.currentEditedParty);
  }

  startRoleEdit($event, theRole: Role) {
    if (!this.currentEditedRole) {
      // this.cancelEditTab<Role>(undefined);
      this.currentEditedRole = theRole;
      this.startEntityEdit<Role>(theRole, this.metaInfo.roles, EditingState.Role);
    } else {
      this.currentEditedRole = undefined;
      this.cancelEditTab<Role>(theRole);
    }
  }

  startRespPartyEdit($event, theParty: ResponsibleParty) {
    if (!this.currentEditedRespParty) {
      this.currentEditedRespParty = theParty;
      this.startEntityEdit<ResponsibleParty>(theParty, this.metaInfo.responsibleParties, EditingState.RespParty);
    } else {
      this.currentEditedRespParty = undefined;
      this.cancelEditTab<ResponsibleParty>(theParty);
    }
  }

  startDocIdEdit($event, theDocId: DocumentIdentifier) {
    if (!this.currentEditedDocId) {
      this.cancelEditTab<DocumentIdentifier>(undefined);
      this.startEntityEdit<DocumentIdentifier>(theDocId, this.metaInfo.documentIDS, EditingState.DocID, this.currentEditedDocId);
    } else {
      this.currentEditedDocId = undefined;
      this.cancelEditTab<DocumentIdentifier>(theDocId);
    }
  }

  startPropertyEdit($event, theProp: Property) {
    if (!this.currentEditedProperty) {
      this.cancelEditTab<Property>(undefined);
      this.startEntityEdit<Property>(theProp, this.metaInfo.props, EditingState.Property, this.currentEditedProperty);
    } else {
      this.currentEditedProperty = undefined;
      this.cancelEditTab<Property>(theProp);
    }
  }

  startLinkEdit($event, theLink: Link) {
    if (!this.currentEditedLink) {
      this.cancelEditTab<Link>(undefined);
      this.startEntityEdit<Link>(theLink, this.metaInfo.links, EditingState.Link, this.currentEditedLink);
    } else {
      this.currentEditedLink = undefined;
      this.cancelEditTab<Link>(theLink);
    }
  }

  startLocationEdit($event, theLocation: Location) {
    if (!this.currentEditedLocation) {
      this.cancelEditTab<Location>(undefined);
      this.startEntityEdit<Location>(theLocation, this.metaInfo.locations, EditingState.Location, this.currentEditedLocation);
    } else {
      this.currentEditedLocation = undefined;
      this.cancelEditTab<Location>(theLocation);
    }
  }


  showTab4AddRole(event, activeType: string, icon: string) {
    this.activeEntityAddTabName = activeType;
  }

  showMetaLink($event, typeName: string, icon: string, paramPOoP: PartyOrganizationOrPerson = null) {
    this.activeEntityAddTabName = typeName;
  }

  showAddMap($event, typeName: string, icon: string) {
    this.activeEntityAddTabName = 'Adding Map';
  }

  addPOoP(newEntity: PartyOrganizationOrPerson) {
    this.activeEntityAddTabName = '';
    if (!!newEntity) {
      console.log(`The POoP = ${newEntity.type}`);
      console.log(`The POoP = ${newEntity.name}`);
      console.log(`The POoP = ${newEntity.uuid}`);
      if (!this.metaInfo.parties) {
        this.metaInfo.parties = new Array<PartyOrganizationOrPerson>();
      }
      this.metaInfo.parties.push(newEntity);
    } else {
      console.log(`Add POoP => CANCELLED!`);
    }
  }

  saveEditedRole(editedRole: Role) {
    this.activeEditState = EditingState.Off;
    this.activeEntityAddTabName = '';
    if (!!editedRole) {
      console.log(`Role-Title = ${editedRole.title}`);
      console.log(`Role-ID = ${editedRole.id}`);
      console.log(`Role-Short = ${editedRole.shortName}`);
      if (!this.metaInfo.parties) {
        this.metaInfo.roles = new Array<Role>();
      }
      if (this.activeEditIndex > -1) {
        this.metaInfo.roles[this.activeEditIndex] = editedRole;
      }
    } else {
      console.log(`Add POoP => CANCELLED!`);
    }
    this.currentEditedRole = undefined;
  }

  saveEditedParty(editedParty: PartyOrganizationOrPerson) {
    this.activeEditState = EditingState.Off;
    this.activeEntityAddTabName = '';
    if (!!editedParty) {
      console.log(`The POoP = ${editedParty.type}`);
      console.log(`The POoP = ${editedParty.name}`);
      console.log(`The POoP = ${editedParty.uuid}`);
      if (!this.metaInfo.parties) {
        this.metaInfo.parties = new Array<PartyOrganizationOrPerson>();
      }
      if (this.activeEditIndex > -1) {
        this.metaInfo.parties[this.activeEditIndex] = editedParty;
      }
    } else {
      console.log(`Save Edited POoP => CANCELLED!`);
    }
    this.currentEditedParty = undefined;
  }

  saveEditedResponsibleParty(editedRespParty: ResponsibleParty) {
    this.activeEditState = EditingState.Off;
    this.activeEntityAddTabName = '';
    if (!!editedRespParty) {
      console.log(`The RoleID = ${editedRespParty.roleID}`);
      console.log(`The UUIDs = ${editedRespParty.partyUuids}`);
      if (!this.metaInfo.responsibleParties) {
        this.metaInfo.responsibleParties = new Array<ResponsibleParty>();
      }
      if (this.activeEditIndex > -1) {
        this.metaInfo.responsibleParties[this.activeEditIndex] = editedRespParty;
        this.activeEditIndex = -1;
      }
    } else {
      console.log(`Save Edited POoP => CANCELLED!`);
    }
    this.currentEditedRespParty = undefined;
  }

  cancelEditTab<Type>(returnType: Type) {
    // Returns variable of unfinished or dropped Edit changes
    // Maybe we need to do something with them?
    // TODO or not ToDo: ?
    this.activeEditState = EditingState.Off;

  }

  cancelAddTab<Type>(returnType: Type) {
    // Returns variable of unfinished or dropped changes
    // Maybe we need to do something with them?
    // TODO or not ToDo: ?
    this.activeEntityAddTabName = '';
  }

  addRole(newRole: Role) {
    this.activeEntityAddTabName = '';
    if (!!newRole) {
      if (!this.metaInfo.roles) {
        this.metaInfo.roles = new Array<Role>();
      }
      this.metaInfo.roles.push(newRole);
      console.log(`+++Add Role => ADDED! Len=${this.metaInfo.roles.length}`);
      console.log(`+++Role-Title = ${newRole.title}`);
      console.log(`+++Role-ID = ${newRole.id}`);
    } else {
      console.log(`Add Role => CANCELLED!`);
    }
  }

  addEditDocID(newDocID: DocumentIdentifier, isEditedDocID?: boolean) {
    this.activeEntityAddTabName = '';
    if (newDocID) {
      if (!isEditedDocID) { // New DocID
        if (!this.metaInfo.documentIDS) {
          this.metaInfo.documentIDS = new Array<DocumentIdentifier>();
        }
        this.metaInfo.documentIDS.push(newDocID);
      } else if (isEditedDocID) {

      }
    }
  }

  addEditProperty(newProp: Property, isEdited?: boolean) {
    this.activeEntityAddTabName = '';
    if (newProp) {
      if (!isEdited) { // New Property
        if (!this.metaInfo.props) {
          this.metaInfo.props = new Array<Property>();
        }
        this.metaInfo.props.push(newProp);
      } else if (isEdited) {

      }
    }
  }

  addEditLink(newLink?: Link, isEdited?: boolean) {
    this.activeEntityAddTabName = '';
    if (newLink) {
      if (!isEdited) { // New Property
        if (!this.metaInfo.links) {
          this.metaInfo.links = new Array<Link>();
        }
        this.metaInfo.links.push(newLink);
      } else if (isEdited) {
      }
    }
  }

  addEditLocation(newLocation?: Location, isEdited?: boolean) {
    this.activeEntityAddTabName = '';
    if (newLocation) {
      if (!isEdited) { // New Property
        if (!this.metaInfo.locations) {
          this.metaInfo.locations = new Array<Location>();
        }
        this.metaInfo.locations.push(newLocation);
      } else if (isEdited) {
      }
    }
  }

  pushIntoOptionalArray<ElementType>(array: Array<ElementType>, newArray: Array<ElementType>): Array<ElementType> {
    if (!newArray) {
      return;
    }
    if (!array) {
      return newArray;
      // console.log(`Array is now ${array.length} elements long`);
    } else {
      newArray.forEach((newEntry: ElementType) => { array.push(newEntry); });
    }
    return array;
  }

  pushUniqueIntoArray<ElementType>(array: Array<ElementType>, newArray: Array<ElementType>) {
    if (!newArray) {
      return;
    }
    newArray.forEach(
      (newEntry: ElementType) => {
        // make sure that the entry NEEDS to be added
        if (array.indexOf(newEntry) < 0) {
          array.push(newEntry);
        }
      });
  }/*  */

  addResponsibleParty(newRespParty: ResponsibleParty) {
    this.activeEntityAddTabName = '';
    if (!!newRespParty) {
      if (!this.metaInfo.responsibleParties) {
        this.metaInfo.responsibleParties = new Array<ResponsibleParty>();
      }
      const roleIndex = this.metaInfo.responsibleParties.findIndex(
        (obj: ResponsibleParty) =>
          obj.roleID === newRespParty.roleID);
      if (roleIndex > -1) {
        // The RoleID already exists:
        // merge the arrays of links and properties;
        this.pushUniqueIntoArray<string>(this.metaInfo.responsibleParties[roleIndex].partyUuids, newRespParty.partyUuids);
        this.metaInfo.responsibleParties[roleIndex].links =
          this.pushIntoOptionalArray<Link>(this.metaInfo.responsibleParties[roleIndex].links, newRespParty.links);
        this.metaInfo.responsibleParties[roleIndex].props =
          this.pushIntoOptionalArray<Property>(this.metaInfo.responsibleParties[roleIndex].props, newRespParty.props);
        // append the remarks text
        if (!this.metaInfo.responsibleParties[roleIndex].remarks) {
          this.metaInfo.responsibleParties[roleIndex].remarks = '';
        } else {
          this.metaInfo.responsibleParties[roleIndex].remarks += '\n\n';
        }
        this.metaInfo.responsibleParties[roleIndex].remarks += `${newRespParty.remarks}`;
      } else {
        // The new role mapping - simply push it in
        this.metaInfo.responsibleParties.push(newRespParty);
      }
      const none = 'None';
      console.log(`+==Id=${newRespParty.roleID} Len=${newRespParty.partyUuids.length}; Links#=${newRespParty.links ? newRespParty.links.length : none}; Props# = ${newRespParty.props ? newRespParty.props.length : none} `);
      console.log(`+== Add Resp => ADDED! Len = ${this.metaInfo.responsibleParties.length} `);
      console.log(`+== Resp - Id = ${newRespParty.roleID} `);
      const last = this.metaInfo.responsibleParties[this.metaInfo.responsibleParties.length - 1];
      if (last.links) {
        console.log(`Value=${last.links[0].href}`);
      }
    } else {
      console.log(`Add Responsible Party => CANCELLED!`);
    }
  }

  hasElements<Type>(theArray: Array<Type>): boolean {
    return !!theArray && theArray.length > 0;
  }
  haveParties(): boolean {
    return this.hasElements<PartyOrganizationOrPerson>(this.metaInfo.parties);
  }
  haveRoles(): boolean {
    return this.hasElements<Role>(this.metaInfo.roles);
  }
  haveResponsible(): boolean {
    return this.hasElements<ResponsibleParty>(this.metaInfo.responsibleParties);
  }
  haveDocIds(): boolean {
    return this.hasElements<DocumentIdentifier>(this.metaInfo.documentIDS);
  }
  haveProperties(): boolean {
    return this.hasElements<Property>(this.metaInfo.props);
  }
  haveLinks(): boolean {
    return this.hasElements<Link>(this.metaInfo.links);
  }
  haveLocations(): boolean {
    return this.hasElements<Location>(this.metaInfo.locations);
  }


  closeAddEditResponsible(controlKey: string, isValid: boolean, returnObject: { [key: string]: ResponsibleParty; }) { }
  closeAddEditPOoP(controlKey: string, isValid: boolean, returnObject: PartyOrganizationOrPerson) { }
  closeAddEditDocId(controlKey: string, isValid: boolean, returnObject: DocumentIdentifier) { }
  closeAddEditProperty(controlKey: string, isValid: boolean, returnObject: Property) { }
  closeAddEditLink(controlKey: string, isValid: boolean, returnObject: Link) { }
  closeAddEditLocation(controlKey: string, isValid: boolean, returnObject: Location) { }
  closeAddEditRole(controlKey: string, isValid: boolean, returnObject: Role) { }



}

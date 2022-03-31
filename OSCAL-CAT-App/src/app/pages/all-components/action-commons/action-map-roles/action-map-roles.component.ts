import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActionAncestorBaseComponent } from '../action-ancestor-base/action-ancestor-base.component';
import { FormsModule } from '@angular/forms';
import { ArrayLinksComponent } from '../action-array-links/action-array-links.component';
import { PropertiesArrayComponent } from '../action-array-properties/action-array-properties.component';

import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';
import { PartyOrganizationOrPerson, ResponsibleParty, Role } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';

enum FormStates {
  StepOne = 1,
  StepOptional = 10,
}

@Component({
  selector: 'oscal-map-roles',
  templateUrl: './action-map-roles.component.html',
  styleUrls: [
    './action-map-roles.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss']
})
export class ActionMapRolesComponent extends ActionAncestorSimpleArrayComponent
  implements OnInit, AfterViewInit, AfterContentInit {

  @Input() responsibleParty?: ResponsibleParty;
  @Input() roles: Array<Role>;
  @Input() actors: Array<PartyOrganizationOrPerson>;

  @ViewChild('linksArray') linksArray: ArrayLinksComponent;
  @ViewChild('propsArray') propsArray: PropertiesArrayComponent;

  filteredRoles: Array<Role>;
  actorsInRole: Array<ResponsibleParty>;
  chosenRoleIndex: number;
  chosenRoleId: string;
  selectedActorsUUIDs: Array<string> = [];
  localResponsible: ResponsibleParty;
  remarksText: string;

  // @ViewChild('remarksInput', { static: true }) remarksInput: ElementRef;

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    super(formBuilder, parentFormDirect);
  }

  private buildInputMap() {
    this.inputsMap.set('2-Role-Id',
      {
        fieldToMap: 'remarks',
        labelName: 'Remarks',
        inputTip: 'Remarks for responsible party',
      });
  }

  ngOnInit() {
    super.ngOnInit();
    this.defaultPluralTitle = 'Responsible Parties';

    if (!!this.responsibleParty) {
      this.localResponsible = this.responsibleParty;
    } else {
      this.localResponsible = OscalCatalogEmpties.getEmptyResponsibleParty();
    }

    this.buildInputMap();
    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
    // this.localResponsible.remarks = "Test2-test2-test2";
    // console.log('Calling AfterViewInit() 1~1~1~1~1~1~1 ');
    this.initMapState('ngOnInit');
  }

  ngAfterViewInit() {
    // console.log('Calling AfterViewInit() 2+2+2+2+2+2+2 ');
    this.initMapState('ngAfterViewInit');
  }

  ngAfterContentInit() {
    console.log('Calling AfterContentInit() 3-3-3-3-3-3-3 ');
    this.initMapState('ngAfterContentInit');
  }

  initMapState(context?: string) {
    if (!!this.localResponsible) {
      this.chosenRoleId = (!!this.localResponsible.roleID) ? this.localResponsible.roleID : undefined;
      if (!!this.localResponsible.partyUuids) {
        //  && this.selectedActorsUUIDs.length !== this.localResponsible.partyUuids.length
        console.log(`@Ctx:${context}; InLen:${this.localResponsible.partyUuids.length}; `);
        this.selectedActorsUUIDs = this.getStringCopies(this.localResponsible.partyUuids);  // this.localResponsible.partyUuids; //
        // this.selectedActorsUUIDs.forEach(uuid => { this.processCheckedActor(uuid); });
        // this.selectedActorsUUIDs = this.localResponsible.partyUuids;
      }
      this.selectedActorsUUIDs.forEach((uuid, idx) => console.log(`UUID[${idx}]=${this.selectedActorsUUIDs[idx]}`));
      this.localResponsible.partyUuids.forEach((uuid, idx) => console.log(`oUUID[${idx}]=${uuid}`));
      console.log(`Text = ${this.getSelectedPartiesAsText()}`);
    }
    // this.processCheckedActor();
  }

  getSelectedPartiesAsText() {
    let ret = '';
    if (!!this.selectedActorsUUIDs) {
      const len = this.selectedActorsUUIDs.length;
      if (len > 0) {
        this.selectedActorsUUIDs.forEach((chosenUuid: string, i) => {
          const idxActor = this.actors.findIndex(e => e.uuid === chosenUuid);
          if (idxActor >= 0) {
            if (len > 1) {
              ret = ret.concat((i > 0 && len !== 2) ? ', ' : '', i === len - 1 ? ' and ' : '', this.actors[idxActor].name);
            } else {
              ret = this.actors[idxActor].name;
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

  getOptionalFieldsTitle(): string {
    if (!!this.chosenRoleId) {
      return `Add Optional Elements to the Party Responsible for [${this.chosenRoleId}] Role`;
    } else {
      return `Select Role To map to the Responsible Parties. This Will Enable Optional Fields`;
    }
  }



  getNewFormGroup<Type>() {
    return this.getControlsArrayByFieldToMap<Role>(this.roles);
  }

  getControlsArray<Type>() {
    return this.getNewFormGroupByFieldToMap<Role>();
  }

  roleGroupChange($event) {
    console.log(`GC==${$event.detail.value} I=${this.chosenRoleIndex}`);
    this.chosenRoleId = $event.detail.value as string;
    // this.chosenRoleIndex = $event.detail.value;
    // this.chosenRoleId = this.roles[this.chosenRoleIndex].id;
  }

  optionalLineOne(): string {
    let retValue = ' Optional Properties';
    if ((!!this.getSelectedPartiesAsText() && this.selectedActorsUUIDs.length > 0) || !!this.chosenRoleId) {
      retValue = ' Optional Properties of the';
    }
    return retValue;
  }

  optionalLineParties() {
    let retValue = ''; // 'Select responsible parties'
    if (this.isValidForm() || (this.selectedActorsUUIDs && this.selectedActorsUUIDs.length > 0)) {
      if (!!this.getSelectedPartiesAsText() && this.selectedActorsUUIDs.length === 1) {
        retValue = `Party: ${this.getSelectedPartiesAsText()}`;
      }
      if (!!this.getSelectedPartiesAsText() && this.selectedActorsUUIDs.length > 1) {
        retValue = `Parties: ${this.getSelectedPartiesAsText()}`;
      }
    }
    return retValue;
  }


  isValidForm() {
    return !!this.chosenRoleId && (!!this.selectedActorsUUIDs && this.selectedActorsUUIDs.length > 0);
  }

  isCheckedActor(uuid: string): boolean {
    if (!this.responsibleParty) {
      return false;
    }
    if (!this.responsibleParty.partyUuids) {
      return false;
    }
    if (this.responsibleParty.partyUuids.includes(uuid)) {
      // const idx = this.responsibleParty.partyUuids.findIndex((e: string) => e === uuid);
      // this.processCheckedActor(uuid);
      return true;
    }
    return false;
  }

  processCheckedActor(uuidValue: string) {
    if (this.isCheckedActor(uuidValue)) {
      this.selectedActorsUUIDs.splice(this.selectedActorsUUIDs.indexOf(uuidValue), 1);
    } else {
      // if(!this.selectedActorsUUIDs.includes(uuid))
      this.selectedActorsUUIDs.push(uuidValue);
    }
  }

  actorSelectChange($event) {
    const uuid = $event.detail.value;
    // console.log(`A-Sel==${$event.detail.value} I=${this.selectedActorsUUIDs}`);
    // Assure that array of selected UUIDs is not empty
    if (!this.selectedActorsUUIDs) {
      this.selectedActorsUUIDs = new Array<string>();
    }
    this.processCheckedActor(uuid);
  }

  onSave() {
    this.onSubmitData();
  }

  onCancelButton() {
    this.closeTab.emit(undefined);
  }

  getStringCopies(data: Array<string>): Array<string> {
    // const newData = [...data];
    const newData = new Array<string>();
    data.forEach(
      (element: string) => {
        const cloned = ''.concat(element).trim(); // Object.assign(Object.create(Object.getPrototypeOf(element)), element);
        newData.push(cloned);
      });
    return newData;
  }

  onSubmitData() {
    const data: ResponsibleParty = {
      roleID: (this.chosenRoleId) ? this.chosenRoleId : this.roles[this.chosenRoleIndex].id,
      partyUuids: this.getStringCopies(this.selectedActorsUUIDs),
      remarks: this.localResponsible.remarks,
      // TODO: Finish arrays info overhaul
      links: this.linksArray.getResultArrayByFieldToMap(OscalCatalogEmpties.getEmptyLink),
      props: this.propsArray.getResultArrayByFieldToMap(OscalCatalogEmpties.getEmptyProperty),
    };
    // console.log(`Rem:${this.localResponsible.remarks}; Model:${this.localResponsible.remarks}`);
    this.saveTab.emit(data);
  }

}

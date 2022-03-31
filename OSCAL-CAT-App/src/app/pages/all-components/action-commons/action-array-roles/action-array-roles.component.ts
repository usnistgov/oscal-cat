import { Component, Input, OnInit } from '@angular/core';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Role } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';

@Component({
  selector: 'oscal-array-roles',
  templateUrl: './action-array-roles.component.html',
  styleUrls: [
    './action-array-roles.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class ActionArrayRolesComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

  @Input() rolesArray: Array<Role>;
  @Input() isPresetRole: boolean;

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    super(formBuilder, parentFormDirect);

    console.log(`==== IsPreset:${this.isPresetRole}`);
  }

  private buildInputsMap() {
    this.inputsMap.set('1-Role-Title',
      {
        fieldToMap: 'title',
        labelName: 'Role Title',
        inputTip: 'A name given to the role, which may be used by a tool for display and navigation.',
        validateAs: [Validators.required],
        requiredField: true,
        isPreset: this.isPresetRole,
      });
    this.inputsMap.set('2-Role-Id',
      {
        fieldToMap: 'id',
        labelName: 'Role ID',
        inputTip: 'A unique identifier for a specific role instance. This identity\'s uniqueness is'.concat(
          ' document-scoped and is intended to be consistent for the same role across minor revisions',
          ' of the document.'),
        validateAs: [Validators.required],
        requiredField: true,
        isPreset: this.isPresetRole,
      });
    this.inputsMap.set('3-Role-ShortName',
      {
        fieldToMap: 'shortName',
        labelName: 'Short Name',
        inputTip: 'A short common name, abbreviation, or acronym for the role.',
        validateAs: [],
      });
    this.inputsMap.set('4-Role-Description',
      {
        fieldToMap: 'description',
        labelName: 'Description',
        inputTip: 'A summary of the role\'s purpose and associated responsibilities',
        validateAs: [],
        complexInputType: true,
        inputAs: 'textarea',
      });
    this.inputsMap.set('5-Role-Remarks',
      {
        fieldToMap: 'remarks',
        labelName: 'Remarks',
        inputTip: 'Creator\'s notes on the intentions, purpose, responsibilities of the role.'.concat(
          'Can also describe differences form other roles if applicable.'),
        validateAs: [],
        complexInputType: true,
        inputAs: 'textarea',
      });
    this.inputsMap.set('6-Role-LinksArray',
      {
        fieldToMap: 'links',
        labelName: 'Role Links',
        inputTip: '',
        validateAs: [],
        complexInputType: true,
        inputAs: 'oscal-array-links',
      });
    this.inputsMap.set('7-Role-PropertiesArray',
      {
        fieldToMap: 'props',
        labelName: 'Role Properties',
        inputTip: '',
        validateAs: [],
        complexInputType: true,
        inputAs: 'oscal-array-properties',
      });
    this.defaultPluralTitle = 'Roles';
    this.defaultSingleTitle = 'Role';
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildInputsMap();
    console.log(`!!!!! IsPreset:${this.isPresetRole}; Title=${this.inputsMap.get('1-Role-Title').isPreset}`);
    // this.inputsMap.get('1-Role-Title').isPreset = this.isPresetRole;
    // this.inputsMap.get('2-Role-Id').isPreset = this.isPresetRole;

    // for (const [key, value] of this.inputsMap) {
    //   console.log(`Key=${key}, Val=${value}`);
    // }

    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }

  getControlsArray() {
    return this.getControlsArrayByFieldToMap<Role>(this.rolesArray);
  }

  getNewFormGroup(data?: Role): FormGroup {
    return this.getNewFormGroupByFieldToMap<Role>();
  }

  onSave() {
    const emptyRole = OscalCatalogEmpties.getEmptyRole();
    const savedRole = this.getUpdatedElementByFieldToMap<Role>(emptyRole);
    console.log(`$$$-Role-ID ${savedRole.id}`);
    console.log(`$$$-Role-TTL ${savedRole.title}`);
    this.saveTab.emit(savedRole);
  }

  onCancel() {
  }

  onCancelButton() {
    this.closeTab.emit();
  }

  onSubmitData() {
    this.onSave();
  }

  closeLinks() {

  }

}

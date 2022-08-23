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
import { Component, Input, OnInit } from '@angular/core';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Role } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';
import { IMustCommitFormDataArray } from '../action-ancestor-base/action-ancestor-base.component';

@Component({
  selector: 'oscal-array-roles',
  templateUrl: './action-array-roles.component.html',
  styleUrls: [
    './action-array-roles.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class ActionArrayRolesComponent
  extends ActionAncestorSimpleArrayComponent
  implements OnInit, IMustCommitFormDataArray<Role> {

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

  formCommitArray(): Array<Role> {
    // Returns the edited Array of Roles back
    const editedLinks = this.getResultArrayByFieldToMap<Role>(OscalCatalogEmpties.getEmptyRole);
    return editedLinks
  }

}

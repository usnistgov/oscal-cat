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
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IonTextarea } from '@ionic/angular';

import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';
import { Property } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { IMustCommitFormDataArray } from '../action-ancestor-base/action-ancestor-base.component';

@Component({
  selector: 'oscal-array-properties',
  templateUrl: './action-array-properties.component.html',
  styleUrls: [
    './action-array-properties.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class PropertiesArrayComponent extends ActionAncestorSimpleArrayComponent implements OnInit, IMustCommitFormDataArray {

  @Input() propertiesArray: Array<Property>;
  @Input() inputDataArray: Array<Property>;

  formCommitArray(): Array<Property> {
    // Returns the edited Array of Props Back
    const editedProps = this.getResultArrayByFieldToMap<Property>(OscalCatalogEmpties.getEmptyProperty);
    return editedProps
  }

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    // ==> Invoke the parent class
    super(formBuilder, parentFormDirect);
    this.inputsMap.set('1-name',
      {
        fieldToMap: 'name',
        labelName: 'Name',
        inputTip: 'A textual label that uniquely identifies a specific attribute, '
          + 'characteristic, or quality of the property\'s containing object.',
        validateAs: [Validators.required],
        requiredField: true,
      });
    this.inputsMap.set('2-value',
      {
        fieldToMap: 'value',
        labelName: 'Value',
        inputTip: 'Indicates the value of the attribute, characteristic, or quality.',
        validateAs: [Validators.required],
        requiredField: true,
      });
    this.inputsMap.set('3-class',
      {
        fieldToMap: 'class',
        labelName: 'Class',
        inputTip: 'A textual label that provides a sub-type or characterization of the property\'s name.'
          + ' This can be used to further distinguish or discriminate between the semantics of multiple'
          + ' properties of the same object with the same name and namespace.',
      });
    this.inputsMap.set('4-ns',
      {
        fieldToMap: 'ns',
        labelName: 'Namespace',
        inputTip: 'A namespace qualifying the property\'s name. This allows different organizations to'
          + ' associate distinct semantics with the same name.',
      });
    this.inputsMap.set('5-uuid',
      {
        fieldToMap: 'uuid',
        labelName: 'UUID',
        inputTip: 'A unique identifier that can be used to reference this property elsewhere in an OSCAL'
          + ' document. A UUID should be consistently used for a given location across revisions of the document.',
        validateAs: [],
        complexInputType: true,
        inputAs: 'uuid',
      });
    this.inputsMap.set('6-remarks',
      {
        fieldToMap: 'remarks',
        labelName: 'Remarks',
        inputTip: 'A textual label to associate with the link, which may be used for presentation in a tool',
        validateAs: [],
        complexInputType: true,
        inputAs: 'textarea',
      });

    this.defaultPluralTitle = 'Properties';
    this.defaultSingleTitle = 'Property';
  }

  ngOnInit() {
    super.ngOnInit();

    for (const [key, value] of this.inputsMap) {
      console.log(`Key=${key}, Val=${value}`);
    }

    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }

  getControlsArray() {
    return this.getControlsArrayByFieldToMap<Property>(this.propertiesArray);
  }

  getNewFormGroup(data?: Property): FormGroup {
    return this.getNewFormGroupByFieldToMap<Property>();
  }


  onSave() {
    const emptyProperty = OscalCatalogEmpties.getEmptyProperty();
    const savedProperty = this.getUpdatedElementByFieldToMap<Property>(emptyProperty);
    this.saveTab.emit(savedProperty);
    this.closeTab.emit();
  }

  onCancel() {
  }

  onCancelButton() {
    this.closeTab.emit();
  }

  onSubmitData() {
    this.onSave();
  }


}

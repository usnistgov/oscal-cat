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
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';


import { ArrayLinksComponent } from '../action-array-links/action-array-links.component';
import { OscalCatalogEmpties } from 'src/app/interfaces/oscal-types/oscal-catalog-factory';

import { Control } from '../../../../interfaces/oscal-types/oscal-catalog.types';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { PropertiesArrayComponent } from '../action-array-properties/action-array-properties.component';
import { CatParamsComponent } from '../action-cat-params/action-cat-params.component';
import { IMustCommitFormDataArray } from '../action-ancestor-base/action-ancestor-base.component';



@Component({
  selector: 'oscal-cat-controls',
  templateUrl: './action-cat-controls.component.html',
  styleUrls: [
    './action-cat-controls.component.css',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss']
})
export class CatControlsComponent
  extends ActionAncestorSimpleArrayComponent
  implements OnInit, IMustCommitFormDataArray<Control> {
  // @Input() control: Control;
  @Input() controls: Array<Control>;


  @ViewChild('linksArray') linksArray: ArrayLinksComponent;
  @ViewChild('propsArray') propsArray: PropertiesArrayComponent;
  @ViewChild('paramsArray') paramsArray: CatParamsComponent;

  constructor(public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    super(formBuilder, parentFormDirect);
    this.defaultPluralTitle = 'Controls';
    this.listTitle = 'Control';
    this.defaultSingleTitle = 'Control';
  }

  buildInputsMap() {
    this.inputsMap.set('1-Id',
      {
        fieldToMap: 'id',
        labelName: 'Control ID',
        inputTip: ''.concat(
          'A unique identifier for a specific control instance that can be used to reference the',
          ' control in other OSCAL documents.This identifier\'s uniqueness is document scoped and is',
          ' intended to be consistent for the same control across minor revisions of the document.'),
        requiredField: true,
        validateAs: [Validators.required],
      });
    this.inputsMap.set('2-Title',
      {
        fieldToMap: 'title',
        labelName: 'Control Title',
        inputTip: 'Control Title [REQUIRED]',
        requiredField: true,
        validateAs: [Validators.required],
      });
    this.inputsMap.set('3-class',
      {
        fieldToMap: 'class',
        labelName: 'Class',
        inputTip: 'A textual label that provides a sub-type or characterization of the property\'s name.'
          + ' This can be used to further distinguish or discriminate between the semantics of multiple'
          + ' properties of the same object with the same name and namespace.',
      });
    this.inputsMap.set('4-params',
      {
        fieldToMap: 'params',
        labelName: 'Parameters',
        inputTip: 'Parameters that can be repeated inside of the control with consistency',
        complexInputType: true,
        inputAs: 'oscal-cat-params',
      });

    this.inputsMap.set('5-text',
      {
        fieldToMap: 'text',
        labelName: 'Description',
        inputTip: 'A text to describe the link fully, which may be used for presentation in a tool',
        validateAs: [],
        complexInputType: true,
        inputAs: 'textarea',
      });
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildInputsMap();
    if (!this.controls) {
      this.controls = [OscalCatalogEmpties.getEmptyControl()];
    }
    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);

  }

  // Plugin into the base class implementation
  getControlsArray() {
    const controlAsArray: Array<Control> = this.controls;
    return this.getControlsArrayByFieldToMap<Control>(controlAsArray);
  }

  // Plugin into the base class implementation
  getNewFormGroup<Type>(data?: Type): FormGroup {
    return this.getNewFormGroupByFieldToMap<Type>();
  }

  onSave(): void {

  }

  formCommitArray(): Array<Control> {
    // Returns the edited Array of Controls Back
    const editedControls = this.getResultArrayByFieldToMap<Control>(OscalCatalogEmpties.getEmptyControl);
    return editedControls
  }


}

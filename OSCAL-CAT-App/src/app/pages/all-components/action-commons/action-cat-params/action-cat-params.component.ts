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
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { OscalCatalogEmpties } from 'src/app/interfaces/oscal-types/oscal-catalog-factory';
import { Parameter } from 'src/app/interfaces/oscal-types/oscal-catalog.types';
import { IMustCommitFormDataArray } from '../action-ancestor-base/action-ancestor-base.component';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { ArrayLinksComponent } from '../action-array-links/action-array-links.component';
import { PropertiesArrayComponent } from '../action-array-properties/action-array-properties.component';
import { ArrayStringsComponent } from '../action-array-strings/action-array-strings.component';

@Component({
  selector: 'oscal-cat-params',
  templateUrl: './action-cat-params.component.html',
  styleUrls: ['./action-cat-params.component.css']
})
export class CatParamsComponent
  extends ActionAncestorSimpleArrayComponent
  implements OnInit, IMustCommitFormDataArray<Parameter> {

  @Input() params: Array<Parameter>;


  @ViewChild('valuesArray') valuesArray: ArrayStringsComponent;
  @ViewChild('linksArray') linksArray: ArrayLinksComponent;
  @ViewChild('propsArray') propsArray: PropertiesArrayComponent;
  // @ViewChild('guideArray') guideArray: CatParamsComponent;
  // @ViewChild('constraintArray') constraintArray: CatParamsComponent; 



  constructor(public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    super(formBuilder, parentFormDirect);
    this.defaultPluralTitle = 'Controls';
    this.listTitle = 'Control';
    this.defaultSingleTitle = 'Control';
  }

  ngOnInit() {
  }


  buildInputsMap() {
    this.inputsMap.set('1-Title',
      {
        fieldToMap: 'title',
        labelName: 'Control Title',
        inputTip: 'Control Title [REQUIRED]',
        requiredField: true,
        validateAs: [Validators.required],
      });
    this.inputsMap.set('2-Id',
      {
        fieldToMap: 'id',
        labelName: 'Control ID',
        inputTip: 'Control ID [REQUIRED]',
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
  }


  getNewFormGroup<Type>() {
    throw new Error('Method not implemented.');
  }
  getControlsArray<Type>() {
    throw new Error('Method not implemented.');
  }


  formCommitArray(): Array<Parameter> {
    // Returns the edited Array of Controls Back
    const editedParams = this.getResultArrayByFieldToMap<Parameter>(OscalCatalogEmpties.getEmptyParameter);
    return editedParams
  }


}

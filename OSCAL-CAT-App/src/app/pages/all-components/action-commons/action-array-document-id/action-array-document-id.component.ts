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
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';

import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';
import { DocumentIdentifier } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { IMustCommitFormDataArray } from '../action-ancestor-base/action-ancestor-base.component';

@Component({
  selector: 'oscal-array-document-ids',
  templateUrl: './action-array-document-id.component.html',
  styleUrls: [
    './action-array-document-id.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class DocumentIDArrayComponent
  extends ActionAncestorSimpleArrayComponent
  implements OnInit, IMustCommitFormDataArray<DocumentIdentifier> {

  @Input() idArray: Array<DocumentIdentifier>;

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    // ==> Invoke the parent class
    super(formBuilder, parentFormDirect);
    this.inputsMap.set('2-scheme',
      {
        fieldToMap: 'scheme',
        labelName: 'Schema',
        inputTip: 'Qualifies the kind of document identifier using a URI. If the scheme is not provided the '.concat(
          'value of the element will be interpreted as a string of characters. '),
      });
    this.inputsMap.set('1-identifier',
      {
        fieldToMap: 'identifier',
        labelName: 'Document Identifier',
        inputTip: ''.concat('If this element does not appear, or if the value of this ',
          'element is empty, the value of "document-id" is equal to the value of ',
          'the UUID flag of the top-level root element.'),
        validateAs: [Validators.required],
        requiredField: true,
      });

  }


  formCommitArray(): Array<DocumentIdentifier> {
    // Returns the edited Array of Links Back
    // With the fieldToMap mapping -use this method of the parent object
    const edDocIds = this.getResultArrayByFieldToMap<DocumentIdentifier>(OscalCatalogEmpties.getEmptyDocID);
    return edDocIds
  }

  ngOnInit() {
    super.ngOnInit();
    this.defaultPluralTitle = 'Document IDs';

    // for (const [key, value] of this.inputsMap) {
    //   console.log(`Key=${key}, Val=${value}`);
    // }

    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }



  getControlsArray() {
    return this.getControlsArrayByKey<DocumentIdentifier>(this.idArray);
  }

  getNewFormGroup(data?: DocumentIdentifier): FormGroup {
    return this.getNewFormGroupByKey<DocumentIdentifier>();
  }

  /**
   * Saves the form data in the object of Document ID Type and pushes it out
   * through the delegate to the parent page to assemble the big JSON data-pile
   *
   * @memberof DocumentIDArrayComponent
   */
  onSave() {
    const savedDocId = OscalCatalogEmpties.getEmptyDocID();
    const updatedDocId = this.getUpdatedElementByKey<DocumentIdentifier>(savedDocId);
    this.saveTab.emit(updatedDocId);
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

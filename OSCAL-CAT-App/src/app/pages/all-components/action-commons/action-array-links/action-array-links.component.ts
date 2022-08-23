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
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators, FormControl } from '@angular/forms';
import { ActionAncestorBaseComponent, IMustCommitFormDataArray } from '../action-ancestor-base/action-ancestor-base.component';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';

import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';
import { Link } from './../../../../interfaces/oscal-types/oscal-catalog.types';

@Component({
  selector: 'oscal-array-links',
  templateUrl: './action-array-links.component.html',
  styleUrls: [
    './action-array-links.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class ArrayLinksComponent
  extends ActionAncestorSimpleArrayComponent
  implements OnInit, IMustCommitFormDataArray<Link> {

  @Input() linksArray: Array<Link>;

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    super(formBuilder, parentFormDirect);
    this.inputsMap.set('1-href',
      {
        fieldToMap: 'href',
        labelName: 'Link Href',
        inputTip: 'A resolvable URL reference to a resource',
        validateAs: [Validators.required],
        requiredField: true,
      });
    this.inputsMap.set('2-mediaType',
      {
        fieldToMap: 'mediaType',
        labelName: 'Link Media Type',
        inputTip: 'Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) MediaTypes Registry',
      });
    this.inputsMap.set('3-rel',
      {
        fieldToMap: 'rel',
        labelName: 'Link Relation',
        inputTip: 'Describes the type of relationship provided by the link. This can be an indicator of the link\'s purpose',
      });
    this.inputsMap.set('4-text',
      {
        fieldToMap: 'text',
        labelName: 'Description',
        inputTip: 'A text to describe the link fully, which may be used for presentation in a tool',
        validateAs: [],
        complexInputType: true,
        inputAs: 'textarea',
      });
    this.defaultPluralTitle = 'Links';
    this.defaultSingleTitle = 'Link';
  }


  formCommitArray(): Array<Link> {
    // Returns the edited Array of Links Back
    // With the fieldToMap mapping -use this method of the parent object
    const editedLinks = this.getResultArrayByFieldToMap<Link>(OscalCatalogEmpties.getEmptyLink);
    return editedLinks
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.singleMode && this.actionName.toLowerCase() == 'add') {
      this.linksArray = this.linksArray || [OscalCatalogEmpties.getEmptyLink()];
    }

    for (const [key, value] of this.inputsMap) {
      console.log(`LINK: Key=${key}, Val=${value}`);
    }

    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }

  getControlsArray() {
    return this.getControlsArrayByFieldToMap<Link>(this.linksArray);
  }

  getNewFormGroup(data?: Link): FormGroup {
    return this.getNewFormGroupByFieldToMap<Link>();
  }

  onSave() {
    const emptyLink = OscalCatalogEmpties.getEmptyLink();
    const savedLink = this.getUpdatedElementByFieldToMap<Link>(emptyLink);
    this.saveTab.emit(savedLink);
    this.closeTab.emit();
  }

  onCancel() {
    this.closeTab.emit();
  }

  onCancelButton() {
    if (this.closeTab) {
      this.closeTab.emit();
    }
  }

  onSubmitData() {
    this.onSave();
  }

}

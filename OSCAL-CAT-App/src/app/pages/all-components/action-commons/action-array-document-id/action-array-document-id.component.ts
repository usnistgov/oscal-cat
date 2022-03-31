import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';

import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';
import { DocumentIdentifier } from './../../../../interfaces/oscal-types/oscal-catalog.types';

@Component({
  selector: 'oscal-array-document-ids',
  templateUrl: './action-array-document-id.component.html',
  styleUrls: [
    './action-array-document-id.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class DocumentIDArrayComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

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

  /*

    XXXgetControlsArray(): FormArray {
      const controls = new Array<FormGroup>();
      if (this.idArray && this.idArray.length > 0) {
        this.idArray.forEach(
          (dataEntry: DocumentIdentifier, idx: number) => {
            controls.push(this.getNewFormGroup(dataEntry));
          });
      }
      this.subArray = new FormArray(controls);
      return this.subArray;
    }

    XXXgetNewFormGroup(data?: DocumentIdentifier): FormGroup {
      const preparedGroup = {};
      for (const [key, value] of this.inputsMap) {
        console.log(`Key=${key}, Val=${value}`);
        preparedGroup[key] = new FormControl(
          (data ? data[key] : ''),
          (value.validateAs ? value.validateAs : [])
        );
      }
      return new FormGroup(preparedGroup);
    }

   */


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

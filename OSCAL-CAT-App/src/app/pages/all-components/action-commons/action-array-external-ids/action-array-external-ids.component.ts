import { Component, Input, OnInit } from '@angular/core';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { PartyExternalIdentifier } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';

@Component({
  selector: 'app-action-array-external-ids',
  templateUrl: './action-array-external-ids.component.html',
  styleUrls: ['./action-array-external-ids.component.scss'],
})
export class ArrayExternalIDsComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

  @Input() externalIDsArray: Array<PartyExternalIdentifier>;

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    // ==> Invoke the parent class
    super(formBuilder, parentFormDirect);

    this.inputsMap.set('1-ID',
      {
        fieldToMap: 'id',
        labelName: 'ID',
        inputTip: ''.concat('Telephone number.'),
        validateAs: [Validators.required],
        requiredField: true,
      });
    this.inputsMap.set('2-scheme',
      {
        fieldToMap: 'scheme',
        labelName: 'Schema',
        inputTip: 'Reflect the schema context of the ID.',
        validateAs: [Validators.required],
        requiredField: true,
      });
  }

  ngOnInit() {
    super.ngOnInit();
    this.defaultPluralTitle = 'External IDs';

    // for (const [key, value] of this.inputsMap) {
    //   console.log(`Key=${key}, Val=${value}`);
    // }

    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }


  getControlsArray() {
    return this.getControlsArrayByFieldToMap<PartyExternalIdentifier>(this.externalIDsArray);
  }

  getNewFormGroup(data?: PartyExternalIdentifier): FormGroup {
    return this.getNewFormGroupByFieldToMap<PartyExternalIdentifier>();
  }

  /**
   * Saves the form data in the object of Document ID Type and pushes it out
   * through the delegate to the parent page to assemble the big JSON data-pile
   *
   * @memberof DocumentIDArrayComponent
   */
  onSave() {
    const savedDocId = OscalCatalogEmpties.getEmptyPartyExternalIdentifier();
    const updatedDocId = this.getUpdatedElementByFieldToMap<PartyExternalIdentifier>(savedDocId);
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
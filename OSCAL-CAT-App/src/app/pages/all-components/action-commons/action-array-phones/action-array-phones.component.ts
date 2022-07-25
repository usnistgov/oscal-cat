import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';

import { TelephoneNumber } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';

@Component({
  selector: 'oscal-array-phones',
  templateUrl: './action-array-phones.component.html',
  styleUrls: ['./action-array-phones.component.scss'],
})
export class ArrayPhonesComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

  @Input() phonesArray: Array<TelephoneNumber>;

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    // ==> Invoke the parent class
    super(formBuilder, parentFormDirect);

    this.inputsMap.set('1-phone-number',
      {
        fieldToMap: 'number',
        labelName: 'Phone Number',
        inputTip: ''.concat('Telephone number.'),
        validateAs: [Validators.required],
        requiredField: true,
      });
    this.inputsMap.set('2-type',
      {
        fieldToMap: 'type',
        labelName: 'Phone Type',
        inputTip: 'Reflect the phone types such as work, cell, home, 9-to-5, etc.',
      });
    this.defaultPluralTitle = 'Phones';
    this.defaultSingleTitle = 'Phone';
  }

  ngOnInit() {
    super.ngOnInit();

    // for (const [key, value] of this.inputsMap) {
    //   console.log(`Key=${key}, Val=${value}`);
    // }

    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }


  getControlsArray() {
    return this.getControlsArrayByFieldToMap<TelephoneNumber>(this.phonesArray);
  }

  getNewFormGroup(data?: TelephoneNumber): FormGroup {
    return this.getNewFormGroupByFieldToMap<TelephoneNumber>();
  }

  /**
   * Saves the form data in the object of Document ID Type and pushes it out
   * through the delegate to the parent page to assemble the big JSON data-pile
   *
   * @memberof DocumentIDArrayComponent
   */
  onSave() {
    const savedPhone = OscalCatalogEmpties.getEmptyPhoneNumber();
    const updatedPhones = this.getUpdatedElementByFieldToMap<TelephoneNumber>(savedPhone);
    this.saveTab.emit(updatedPhones);
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

import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { IonTextarea } from '@ionic/angular';

import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';
import { Property } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';

@Component({
  selector: 'oscal-array-properties',
  templateUrl: './action-array-properties.component.html',
  styleUrls: [
    './action-array-properties.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class PropertiesArrayComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

  @Input() propertiesArray: Array<Property>;

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
  /*

    getControlsArray(): FormArray {
      const controls = new Array<FormGroup>();
      if (this.propertiesArray && this.propertiesArray.length > 0) {
        this.propertiesArray.forEach(
          (dataEntry: Property, idx: number) => {
            controls.push(this.getNewFormGroup(dataEntry));
          });
      }
      this.subArray = new FormArray(controls);
      return this.subArray;
    }

    getNewFormGroup(data?: Property): FormGroup {
      const group = {};
      for (const [key, value] of this.inputsMap) {
        console.log(`Key=${key}, Val=${value}`);
        group[value.fieldToMap] = new FormControl(
          (data ? data[value.fieldToMap] : ''),
          (value.validateAs ? value.validateAs : [])
        );
      }
      return new FormGroup(group);
    }

   */
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

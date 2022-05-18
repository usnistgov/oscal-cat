import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';


import { ArrayLinksComponent } from '../action-array-links/action-array-links.component';
import { OscalCatalogEmpties } from 'src/app/interfaces/oscal-types/oscal-catalog-factory';

import { Control } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';



@Component({
  selector: 'app-action-cat-control',
  templateUrl: './action-cat-control.component.html',
  styleUrls: ['./action-cat-control.component.css']
})
export class CatControlComponent extends ActionAncestorSimpleArrayComponent implements OnInit {
  @Input() control: Control;


  @ViewChild('linksArray') linksArray: ArrayLinksComponent;

  constructor(public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    super(formBuilder, parentFormDirect);
    this.defaultPluralTitle = 'Controls';
    this.listTitle = 'Control';
    this.defaultSingleTitle = 'Control';
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

  ngOnInit() {
    super.ngOnInit();
    this.buildInputsMap();
    if (!this.control) {
      this.control = OscalCatalogEmpties.getEmptyControl();
    }
    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);

  }

  // Plugin into the base class implementation
  getControlsArray() {
    const controlAsArray: Array<Control> = [this.control];
    return this.getControlsArrayByFieldToMap<Control>(controlAsArray);
  }

  // Plugin into the base class implementation
  getNewFormGroup<Type>(data?: Type): FormGroup {
    return this.getNewFormGroupByFieldToMap<Type>();
  }

}

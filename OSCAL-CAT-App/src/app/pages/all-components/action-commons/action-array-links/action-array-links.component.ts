import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators, FormControl } from '@angular/forms';
import { ActionAncestorBaseComponent } from '../action-ancestor-base/action-ancestor-base.component';
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
export class ArrayLinksComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

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

  ngOnInit() {
    super.ngOnInit();


    for (const [key, value] of this.inputsMap) {
      console.log(`LINK: Key=${key}, Val=${value}`);
    }

    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }

  /*
    getControlsArray(): FormArray {
      const controls = new Array<FormGroup>();
      if (this.linksArray && this.linksArray.length > 0) {
        this.linksArray.forEach(
          (dataEntry: Link, idx: number) => {
            controls.push(this.getNewFormGroup(dataEntry));
          });
      }
      this.subArray = new FormArray(controls);
      return this.subArray;
    }


    getNewFormGroup(data?: Link): FormGroup {
      const group = {};
      for (const [key, value] of this.inputsMap) {
        console.log(`Key=${key}, Val=${value}`);
        group[key] = new FormControl(
          (data ? data[key] : ''),
          (value.validateAs ? value.validateAs : [])
        );
      }
      return new FormGroup(group);
    } */


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
  }

  onCancelButton() {
    this.closeTab.emit();
  }

  onSubmitData() {
    this.onSave();
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { v4 as UUIDv4 } from 'uuid';
import { ActionAncestorBaseComponent, FieldInfo } from './action-ancestor-base.component';


@Component({
  selector: 'oscal-action-ancestor-base',
  templateUrl: './action-ancestor-base.component.html',
  styleUrls: ['./action-ancestor-base.component.scss'],
})

// The most abstract entity manipulation aggregation for entities with UI
// Unfortunately, UI can not be inherited, so, implementation has to be done 
// !!!!! at the inheritance point !!!!
export abstract class ActionAncestorSimpleArrayComponent extends ActionAncestorBaseComponent implements OnInit {


  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {
    // ==> The mandated super call
    super(formBuilder, parentFormDirect);
    this.inputsMap = new Map<string, FieldInfo>();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  onRemoveElement(i: number) {
    this.subArray.controls.splice(i, 1);
  }

  onAppendElement<Type>() {
    if (!this.singleMode) {
      this.subArray.controls.push(this.getNewFormGroup<Type>());
    }
  }


  hasArrayEntries(): boolean {
    return this.arrayEntriesLength() > 0;
    // const currentEntries = this.subArray.get('entries') as FormArray;
    // return (currentEntries.length > 0);
  }


  arrayEntriesLength(): number {
    const currentEntries = this.subArray.get('entries') as FormArray;
    return currentEntries.length;
  }

  displayItemTitle(): boolean {
    return (!this.hideTitle && !this.singleMode);
  }

  onAssignUUID() {
    this.localForm.patchValue({ uuid: UUIDv4() });
  }

  getEmailValidator(): Validators {
    return Validators.email;
  }

  getToolTip(theTip: string): string {
    return !!theTip ? theTip : `${this.inputName} for ${this.parentName || this.parentEntity} should be entered here`;
  }

  isOptional(info: FieldInfo): boolean {
    return (info.requiredField === undefined || info.requiredField === null || !info.requiredField);
  }

  abstract getNewFormGroup<Type>();
  abstract getControlsArray<Type>();


  getControlsArrayByKey<Type>(dataArray: Array<Type>): FormArray {
    const controls = new Array<FormGroup>();
    if (dataArray && dataArray.length > 0) {
      dataArray.forEach(
        (dataEntry: Type, idx: number) => {
          controls.push(this.getNewFormGroupByKey<Type>(dataEntry));
        });
    }
    this.subArray = new FormArray(controls);
    return this.subArray;
  }

  getControlsArrayByFieldToMap<Type>(dataArray: Array<Type>): FormArray {
    const controls = new Array<FormGroup>();
    if (dataArray && dataArray.length > 0) {
      dataArray.forEach(
        (dataEntry: Type, idx: number) => {
          controls.push(this.getNewFormGroupByFieldToMap<Type>(dataEntry));
        });
    }
    this.subArray = new FormArray(controls);
    return this.subArray;
  }

  getResultArrayByKey<Type>(emptyTypeMaker: () => Type): Array<Type> {
    const updatedArray = new Array<Type>();
    this.subArray.controls.forEach(
      (group, idx) => {
        const data = this.getUpdatedElementByKey(emptyTypeMaker(), idx);
        if (!!data) {
          updatedArray.push(data);
        }
      }
    );

    if (updatedArray.length > 0) {
      return updatedArray;
    } else {
      return undefined;
    }
  }

  getResultArrayByFieldToMap<Type>(emptyTypeMaker: () => Type): Array<Type> {
    const updatedArray = new Array<Type>();
    this.subArray.controls.forEach(
      (group, idx) => {
        const data = this.getUpdatedElementByFieldToMap(emptyTypeMaker(), idx);
        if (!!data) {
          updatedArray.push(data);
        }
      }
    );

    if (updatedArray.length > 0) {
      return updatedArray;
    } else {
      return undefined;
    }
  }

  /**
   * Generic LOOSE-ALL data close for the cases 
   * when the close method was provided
   * @memberof ActionAncestorSimpleArrayComponent
   */
  onCloseAnyTab() {
    if (this.closeTab) {
      this.closeTab.emit();
    } else {
      console.log(`Structural Error!: The closeTab Property was not provided !!!!`);
    }
  }

  onSaveTabScalar<ScalarType>() {
    if (this.closeTab) {
      this.closeTab.emit();
    }
  }

  onSaveTabArray<ArrayType>() {
    if (this.closeTab) {
      this.closeTab.emit();
    }
  }


}

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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'oscal-array-string',
  templateUrl: './action-array-strings.component.html',
  styleUrls: ['./action-array-strings.component.scss'],
})
export class ArrayStringsComponent implements OnInit {

  @Input() ID: string;
  @Input() listTitle: string;
  @Input() parentEntity: string;
  @Input() parentName: string;
  @Input() inputName: string;
  @Input() validateAs: Validators;
  @Input() isArrayOptionalText?: string;
  @Input() isArrayOptional?: boolean;

  @Input() stringData: Array<string>;
  // Event emitters for call-backs, if needed
  @Output() closeTab: EventEmitter<any> = new EventEmitter();
  @Output() saveTab: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();

  localForm: FormGroup;
  subForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {

  }

  getForm(): FormGroup {
    return this.localForm.get(`${this.ID}`) as FormGroup;
  }

  ngOnInit() {
    this.stringData = !!this.stringData ? this.stringData : [''];
    this.localForm = this.parentFormDirect.form;

    // this.localForm.addControl(this.ID, this.formBuilder.array(this.getControlsArray(this.stringData)));
    this.subForm = this.formBuilder.group({
      entries: this.formBuilder.array(
        this.getControlsArray(this.stringData)  // this.stringData
      ),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }


  getControlsArray(items: Array<string>): Array<FormGroup> {
    const controlArray = new Array<FormGroup>();
    items.forEach(
      (element: string, index: number) => {
        // groupObject['email_' + index.toString()] = [element, Validators.email];
        controlArray.push(this.getNewFormControl(element));
        console.log(`Element[${index}]: ${element}`);
      });
    return controlArray;
  }

  getNewFormControl(element: string): FormGroup {
    if (!!this.validateAs) {
      console.log(`Validator: ${typeof this.validateAs}`)
      return this.formBuilder.group({ entry: [element, this.validateAs] });
    } else {
      return this.formBuilder.group({ entry: [element, Validators.required] });
    }
  }

  onAppendElement() {
    const currentEntries = this.subForm.get('entries') as FormArray;
    currentEntries.push(this.getNewFormControl(''));
  }


  onRemoveElement(itemIndex: number) {
    const currentEntries = this.subForm.get('entries') as FormArray;
    currentEntries.removeAt(itemIndex); // Remove array element itemIndex
  }


  getListTitle(): string {
    const formArray = this.subForm.get('entries') as FormArray;
    const count = formArray.length;
    const prefix = ((count > 0) ? `` : `No`);
    const sufSuf = (count === 1) ? '' : 's'; // Plural Suffix
    const suffix = ((count > 0) ? `[${count} ${this.inputName}${sufSuf}]` : '');
    const endingOpt = (!this.isArrayOptional) ? '' : this.isArrayOptional;
    const title = (!!this.parentName ?
      `${prefix} ${this.listTitle} for ${this.parentName} ${suffix}  ${endingOpt}` :
      `${prefix} ${this.listTitle} for ${this.parentEntity} ${suffix}  ${endingOpt}`);
    return title;
  }

  hasEntries(): boolean {
    const currentEntries = this.subForm.get('entries') as FormArray;
    return (currentEntries.length > 0);
  }

  /**
   * Throw away all the information and get out   *
   * @memberof ActionArrayStringComponent
   */
  onClose() {

  }

  getStringArrayData(): Array<string> {
    const currentEntries = this.subForm.get('entries') as FormArray;
    const returnData = new Array<string>();
    currentEntries.controls.forEach(
      (element, index) => {
        const strVal = element.value.toString();
        if (!!strVal && !!strVal.length) {
          returnData.push(strVal);
        }
      });
    return returnData;
  }

  /**
   * Collect the string array and return it back to the parent
   * @memberof ActionArrayStringComponent
   */
  onSave() {
    this.saveTab.emit(this.getStringArrayData());
  }

}

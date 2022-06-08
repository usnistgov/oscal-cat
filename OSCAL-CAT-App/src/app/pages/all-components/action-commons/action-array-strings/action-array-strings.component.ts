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

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective } from '@angular/forms';

import { ActionAncestorBaseComponent } from '../action-ancestor-base/action-ancestor-base.component';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';

@Component({
  selector: 'app-action-array-locations',
  templateUrl: './action-array-locations.component.html',
  styleUrls: [
    './action-array-locations.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class LocationsArrayComponent extends ActionAncestorSimpleArrayComponent implements OnInit {

  @Input() locationsArray: Array<Location>;

  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {

    super(formBuilder, parentFormDirect);
  }

  ngOnInit() {
    //this.addFormGroup
  }

  getNewFormGroup<Location>() {
    throw new Error('Method not implemented.');
  }

  getControlsArray<Location>() {
    throw new Error('Method not implemented.');
  }


  onSave() {

  }

  onCancelButton() {/* event: Event */

  }

  onSubmitData() {

  }

}

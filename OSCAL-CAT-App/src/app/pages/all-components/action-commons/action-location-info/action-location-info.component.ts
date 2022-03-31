import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
// import { ActionAncestorBaseComponent } from '../action-ancestor-base/action-ancestor-base.component';
import { ActionAncestorSimpleArrayComponent } from '../action-ancestor-base/action-base-simple-array-form.component';
import { ArrayPhonesComponent } from '../action-array-phones/action-array-phones.component';
import { ArrayStringsComponent } from '../action-array-strings/action-array-strings.component';
import { PropertiesArrayComponent } from '../action-array-properties/action-array-properties.component';
import { ArrayLinksComponent } from '../action-array-links/action-array-links.component';


import { Link, Location, Property } from './../../../../interfaces/oscal-types/oscal-catalog.types';
import { OscalCatalogEmpties } from '../../../../interfaces/oscal-types/oscal-catalog-factory';

@Component({
  selector: 'oscal-location-info',
  templateUrl: './action-location-info.component.html',
  styleUrls: [
    './action-location-info.component.scss',
    '../../action-all-common/ion-tabs-buttons.scss',
    '../../action-all-common/div-scroll.scss'],
})
export class LocationInfoComponent extends ActionAncestorSimpleArrayComponent implements OnInit {
  @Input() locationInfo: Location;
  @Output() public closeTab: EventEmitter<Location>;
  @Output() public saveTab: EventEmitter<Location>;

  @ViewChild('phonesArray') phonesArray: ArrayPhonesComponent;
  @ViewChild('emailsArray') emailsArray: ArrayStringsComponent;
  @ViewChild('linksArray') linksArray: ArrayLinksComponent;
  @ViewChild('propsArray') propsArray: PropertiesArrayComponent;
  @ViewChild('urlsArray') urlsArray: ArrayStringsComponent;




  constructor(
    public formBuilder: FormBuilder,
    public parentFormDirect: FormGroupDirective) {

    super(formBuilder, parentFormDirect);
    this.defaultPluralTitle = 'Locations';
    this.listTitle = 'Location';
    this.defaultSingleTitle = 'Location';
  }

  private buildInputsMap() {
    this.inputsMap.set('1-UUID',
      {
        fieldToMap: 'uuid',
        labelName: 'Location UUID',
        inputTip: 'UUID is an unique identifier that can be used to reference this defined' +
          ' location elsewhere in an OSCAL document. A UUID should be consistently used for' +
          ' a given location across revisions of the document. [!- REQUIRED -!]',
        validateAs: [Validators.required],
        requiredField: true,
        complexInputType: true,
        inputAs: 'uuid',
      });
    this.inputsMap.set('2-Title',
      {
        fieldToMap: 'title',
        labelName: 'Location Title',
        inputTip: 'Title for location, if needed (optional)',
      });
    this.inputsMap.set('3-Address',
      {
        fieldToMap: 'address',
        labelName: 'Address',
        inputTip: 'The location\'s address. [!- REQUIRED -!]',
        validateAs: [Validators.required],
        requiredField: true,
        complexInputType: true,
        inputAs: 'oscal-address-list',
      });
    this.inputsMap.set('4-PhonesArray',
      {
        fieldToMap: 'telephoneNumbers',
        labelName: 'Phones',
        inputTip: 'Phones for the location, if needed (optional)',
        complexInputType: true,
        inputAs: 'oscal-array-phones',
      });
    this.inputsMap.set('5-EmailsArray',
      {
        fieldToMap: 'emailAddresses',
        labelName: 'Emails',
        inputTip: 'Emails for the location, if needed (optional)',
        complexInputType: true,
        inputAs: 'oscal-array-emails',
      });
    this.inputsMap.set('6-LinksArray',
      {
        fieldToMap: 'links',
        labelName: 'Links',
        inputTip: 'Links for the location, if needed (optional)',
        complexInputType: true,
        inputAs: 'oscal-array-links',
      });
    this.inputsMap.set('7-PropertiesArray',
      {
        fieldToMap: 'props',
        labelName: 'Properties',
        inputTip: 'Properties for the location, if needed (optional)',
        complexInputType: true,
        inputAs: 'oscal-array-properties',
      });
    this.inputsMap.set('8-URLsArray',
      {
        fieldToMap: 'urls',
        labelName: 'URLs',
        inputTip: 'URLs for the location, if needed (optional)',
        complexInputType: true,
        inputAs: 'oscal-array-urls',
      });
    this.inputsMap.set('9-Remarks',
      {
        fieldToMap: 'remarks',
        labelName: 'Remarks',
        inputTip: 'Creator\'s notes on the intentions and purpose of the location  (optional)',
        complexInputType: true,
        inputAs: 'textarea',
      });
    this.defaultPluralTitle = 'Locations';
    this.defaultSingleTitle = 'Location';
  }

  ngOnInit() {
    super.ngOnInit();
    this.buildInputsMap();
    if (!this.locationInfo) {
      this.locationInfo = OscalCatalogEmpties.getEmptyLocation();
    }
    this.subForm = this.formBuilder.group({
      entries: this.getControlsArray(),
    });
    this.localForm.addControl(this.ID, this.subForm);
  }

  getControlsArray() {
    const locationAsArray: Array<Location> = [this.locationInfo];
    return this.getControlsArrayByFieldToMap<Location>(locationAsArray);

    // return this.getNewFormGroupByFieldToMap<Location>([this.locationInfo]);
    // return this.getControlsArrayByFieldToMap<Role>(this.rolesArray);
  }

  getNewFormGroup<Type>(data?: Type): FormGroup {
    return this.getNewFormGroupByFieldToMap<Type>();
  }

  /**
   * Needs to extend validation according to  D. Waltermire and W. Piez
   */
  isValidForm(): boolean {
    const retVal = this.subForm.valid;
    return retVal;
  }


  onSave() {
    const emptyLocation = OscalCatalogEmpties.getEmptyLocation();
    const savedLocation = this.getUpdatedElementByFieldToMap<Location>(emptyLocation);
    console.log(` #2 UUID=${savedLocation.uuid}`);
    savedLocation.emailAddresses = this.emailsArray.getStringArrayData();
    console.log(` #3`);
    savedLocation.links = this.linksArray.getResultArrayByFieldToMap<Link>(OscalCatalogEmpties.getEmptyLink);
    console.log(` #4`);
    savedLocation.props = this.propsArray.getResultArrayByFieldToMap<Property>(OscalCatalogEmpties.getEmptyProperty);
    console.log(` #5`);

    // console.log(`Rem:${this.localResponsible.remarks}; Model:${this.localResponsible.remarks}`);
    this.saveTab.emit(savedLocation);
    this.closeTab.emit();
  }

  onCancel() {
    this.closeTab.emit();
  }

}

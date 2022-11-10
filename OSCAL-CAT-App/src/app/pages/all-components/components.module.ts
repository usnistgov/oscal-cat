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
import { ActionArrayRolesComponent } from './action-commons/action-array-roles/action-array-roles.component';
import { ArrayAddressesComponent } from './action-commons/action-array-addresses/action-array-addresses.component';
import { from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectFamiliesComponent } from './select-families/select-families.component';
import { ControlComponent } from './control/control.component';
import { BackMatterComponent } from './back-matter/back-matter.component';
import { MetaInfoComponent } from './meta-info/meta-info.component';
import { AuthoringModeComponent } from './authoring-mode/authoring-mode.component';
import { NavCatComponent } from './nav-cat/nav-cat.component';
// Actions Pop-Ups
import { ActionPartyInfoComponent } from './action-commons/action-party-info/action-party-info.component';
import { ActionWaitComponent } from './action-commons/action-wait/action-wait.component';
import { ArrayStringsComponent } from './action-commons/action-array-strings/action-array-strings.component';
import { ActionAncestorBaseComponent } from './action-commons/action-ancestor-base/action-ancestor-base.component';
import { ArrayLinksComponent } from './action-commons/action-array-links/action-array-links.component';
import { LocationInfoComponent } from './action-commons/action-location-info/action-location-info.component';
import { LocationsArrayComponent } from './action-commons/action-array-locations/action-array-locations.component';
import { PropertiesArrayComponent } from './action-commons/action-array-properties/action-array-properties.component';
import { DocumentIDArrayComponent } from './action-commons/action-array-document-id/action-array-document-id.component';
import { ArrayPhonesComponent } from './action-commons/action-array-phones/action-array-phones.component';
import { ArrayExternalIDsComponent } from './action-commons/action-array-external-ids/action-array-external-ids.component';
import { ActionMapRolesComponent } from './action-commons/action-map-roles/action-map-roles.component';
import { AuthorBeginComponent } from './author-begin/author-begin.component';
import { SelectBaselineComponent } from './action-commons/action-select-baseline/action-select-baseline.component';
import { CatParamsComponent } from './action-commons/action-cat-params/action-cat-params.component';
import { CatControlsComponent } from './action-commons/action-cat-controls/action-cat-controls.component';
import { OscalCatAuthorViewComponent } from './action-commons/action-oscal-cat-author-view/action-oscal-cat-author-view.component';
import { ActionSettingsElementComponent } from './action-commons/action-settings-element/action-settings-element.component';
import { CatTheBaseComponent } from './action-all-common/cat-the-base/cat-the-base.component';



@NgModule({
  declarations: [SelectFamiliesComponent, NavCatComponent, ActionWaitComponent, ActionAncestorBaseComponent,
    ArrayAddressesComponent, ArrayStringsComponent, ArrayLinksComponent, LocationInfoComponent, LocationsArrayComponent,
    BackMatterComponent, ControlComponent, MetaInfoComponent, AuthoringModeComponent, ActionPartyInfoComponent,
    PropertiesArrayComponent, DocumentIDArrayComponent, ActionArrayRolesComponent, ArrayPhonesComponent,
    ArrayExternalIDsComponent, ActionMapRolesComponent, AuthorBeginComponent, SelectBaselineComponent,
    CatParamsComponent, CatControlsComponent, OscalCatAuthorViewComponent, ActionSettingsElementComponent, CatTheBaseComponent,
  ],
  exports: [SelectFamiliesComponent, NavCatComponent, ActionWaitComponent, ActionAncestorBaseComponent,
    ArrayAddressesComponent, ArrayStringsComponent, ArrayLinksComponent, LocationInfoComponent, LocationsArrayComponent,
    BackMatterComponent, ControlComponent, MetaInfoComponent, AuthoringModeComponent, ActionPartyInfoComponent,
    PropertiesArrayComponent, DocumentIDArrayComponent, ActionArrayRolesComponent, ArrayPhonesComponent,
    ArrayExternalIDsComponent, ActionMapRolesComponent, AuthorBeginComponent, SelectBaselineComponent,
    CatParamsComponent, CatControlsComponent, OscalCatAuthorViewComponent, ActionSettingsElementComponent, CatTheBaseComponent,
  ],

  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule,
  ],
})
export class ComponentsModule { }

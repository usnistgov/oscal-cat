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



@NgModule({
  declarations: [SelectFamiliesComponent, NavCatComponent, ActionWaitComponent, ActionAncestorBaseComponent,
    ArrayAddressesComponent, ArrayStringsComponent, ArrayLinksComponent, LocationInfoComponent, LocationsArrayComponent,
    BackMatterComponent, ControlComponent, MetaInfoComponent, AuthoringModeComponent, ActionPartyInfoComponent,
    PropertiesArrayComponent, DocumentIDArrayComponent, ActionArrayRolesComponent, ArrayPhonesComponent,
    ArrayExternalIDsComponent, ActionMapRolesComponent, AuthorBeginComponent, SelectBaselineComponent,
  ],
  exports: [SelectFamiliesComponent, NavCatComponent, ActionWaitComponent, ActionAncestorBaseComponent,
    ArrayAddressesComponent, ArrayStringsComponent, ArrayLinksComponent, LocationInfoComponent, LocationsArrayComponent,
    BackMatterComponent, ControlComponent, MetaInfoComponent, AuthoringModeComponent, ActionPartyInfoComponent,
    PropertiesArrayComponent, DocumentIDArrayComponent, ActionArrayRolesComponent, ArrayPhonesComponent,
    ArrayExternalIDsComponent, ActionMapRolesComponent, AuthorBeginComponent, SelectBaselineComponent,
  ],

  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule,
  ],
})
export class ComponentsModule { }

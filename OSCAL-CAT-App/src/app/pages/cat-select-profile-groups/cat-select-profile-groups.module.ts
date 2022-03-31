import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatSelectProfileGroupsPageRoutingModule } from './cat-select-profile-groups-routing.module';
import { CatSelectProfileGroupsPage } from './cat-select-profile-groups.page';

import { ComponentsModule } from './../all-components/components.module';
import { TreesModule } from './../all-components/trees.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatSelectProfileGroupsPageRoutingModule,
    TreesModule,
    ComponentsModule,
  ],
  declarations: [CatSelectProfileGroupsPage]
})
export class CatSelectProfileGroupsPageModule { }

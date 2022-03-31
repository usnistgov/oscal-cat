import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatSelectProfilePageRoutingModule } from './cat-select-profile-routing.module';
import { CatSelectProfilePage } from './cat-select-profile.page';

import { ComponentsModule } from './../all-components/components.module';
import { TreesModule } from './../all-components/trees.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatSelectProfilePageRoutingModule
    , ComponentsModule
    , TreesModule
  ],
  declarations: [CatSelectProfilePage],

})
export class CatSelectProfilePageModule { }

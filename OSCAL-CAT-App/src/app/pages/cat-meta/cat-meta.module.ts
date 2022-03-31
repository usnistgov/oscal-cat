import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CatMetaPageRoutingModule } from './cat-meta-routing.module';
import { CatMetaPage } from './cat-meta.page';

import { ComponentsModule } from './../all-components/components.module';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , CatMetaPageRoutingModule
    , ComponentsModule
    ,
  ],
  declarations: [CatMetaPage]
})
export class CatMetaPageModule { }

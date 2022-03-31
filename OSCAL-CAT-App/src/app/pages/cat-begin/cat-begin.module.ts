import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CatBeginPageRoutingModule } from './cat-begin-routing.module';
import { CatBeginPage } from './cat-begin.page';
import { CatMetaPageRoutingModule } from '../cat-meta/cat-meta-routing.module';
import { ComponentsModule } from '../all-components/components.module';


@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , CatBeginPageRoutingModule
    , CatMetaPageRoutingModule
    , ComponentsModule
    ,
  ],
  declarations: [CatBeginPage]
})
export class CatBeginPageModule { }

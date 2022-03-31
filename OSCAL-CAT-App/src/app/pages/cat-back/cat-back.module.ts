import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CatBackPageRoutingModule } from './cat-back-routing.module';
import { CatBackPage } from './cat-back.page';

import { ComponentsModule } from './../all-components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatBackPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CatBackPage]
})
export class CatBackPageModule { }

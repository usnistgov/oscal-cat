import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatSavePageRoutingModule } from './cat-save-routing.module';

import { CatSavePage } from './cat-save.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatSavePageRoutingModule
  ],
  declarations: [CatSavePage]
})
export class CatSavePageModule {}

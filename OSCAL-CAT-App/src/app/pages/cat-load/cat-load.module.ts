import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatLoadPageRoutingModule } from './cat-load-routing.module';

import { CatLoadPage } from './cat-load.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatLoadPageRoutingModule
  ],
  declarations: [CatLoadPage]
})
export class CatLoadPageModule {}

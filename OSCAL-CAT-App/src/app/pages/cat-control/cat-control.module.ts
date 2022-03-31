import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatControlPageRoutingModule } from './cat-control-routing.module';

import { CatControlPage } from './cat-control.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatControlPageRoutingModule
  ],
  declarations: [CatControlPage]
})
export class CatControlPageModule { }

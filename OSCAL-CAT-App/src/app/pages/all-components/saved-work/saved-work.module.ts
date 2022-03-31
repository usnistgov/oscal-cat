import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedWorkPageRoutingModule } from './saved-work-routing.module';

import { SavedWorkPage } from './saved-work.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedWorkPageRoutingModule
  ],
  declarations: [SavedWorkPage]
})
export class SavedWorkPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatReviewPageRoutingModule } from './cat-review-routing.module';

import { CatReviewPage } from './cat-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatReviewPageRoutingModule
  ],
  declarations: [CatReviewPage]
})
export class CatReviewPageModule {}

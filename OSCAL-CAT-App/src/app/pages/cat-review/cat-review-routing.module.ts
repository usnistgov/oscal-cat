import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatReviewPage } from './cat-review.page';

const routes: Routes = [
  {
    path: '',
    component: CatReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatReviewPageRoutingModule {}

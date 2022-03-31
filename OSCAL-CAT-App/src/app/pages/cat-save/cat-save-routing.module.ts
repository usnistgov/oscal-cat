import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatSavePage } from './cat-save.page';

const routes: Routes = [
  {
    path: '',
    component: CatSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatSavePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatSelectCatAsyncPage } from './cat-select-cat-async.page';

const routes: Routes = [
  {
    path: '',
    component: CatSelectCatAsyncPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatSelectCatalogPageRoutingModule { }

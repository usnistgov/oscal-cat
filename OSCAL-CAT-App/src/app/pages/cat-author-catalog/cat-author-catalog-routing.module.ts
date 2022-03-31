import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatAuthorCatalogPage } from './cat-author-catalog.page';

const routes: Routes = [
  {
    path: '',
    component: CatAuthorCatalogPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatAuthorCatalogPageRoutingModule { }

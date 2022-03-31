import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatMetaPage } from './cat-meta.page';

const routes: Routes = [
  {
    path: '',
    component: CatMetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatMetaPageRoutingModule {}

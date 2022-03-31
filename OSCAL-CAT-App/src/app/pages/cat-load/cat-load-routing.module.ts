import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatLoadPage } from './cat-load.page';

const routes: Routes = [
  {
    path: '',
    component: CatLoadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatLoadPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatBackPage } from './cat-back.page';

const routes: Routes = [
  {
    path: '',
    component: CatBackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatBackPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatControlPage } from './cat-control.page';

const routes: Routes = [
  {
    path: '',
    component: CatControlPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatControlPageRoutingModule {}

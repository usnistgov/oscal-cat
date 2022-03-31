import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatBeginPage } from './cat-begin.page';

const routes: Routes = [
  {
    path: '',
    component: CatBeginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatBeginPageRoutingModule {}

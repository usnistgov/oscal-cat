import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatSelectProfilePage } from './cat-select-profile.page';

const routes: Routes = [
  {
    path: '',
    component: CatSelectProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatSelectProfilePageRoutingModule {}

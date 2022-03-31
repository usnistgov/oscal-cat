import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedWorkPage } from './saved-work.page';

const routes: Routes = [
  {
    path: '',
    component: SavedWorkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedWorkPageRoutingModule {}

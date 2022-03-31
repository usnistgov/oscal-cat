import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatSelectProfileGroupsPage } from './cat-select-profile-groups.page';

const routes: Routes = [
  {
    path: '',
    component: CatSelectProfileGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatSelectProfileGroupsPageRoutingModule {}

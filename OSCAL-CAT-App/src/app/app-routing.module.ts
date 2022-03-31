import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cat-begin',
    pathMatch: 'full'
  }, {
    path: 'cat-begin',
    loadChildren: () => import('./pages/cat-begin/cat-begin.module').then(m => m.CatBeginPageModule),
  }, {
    path: 'cat-meta',
    loadChildren: () => import('./pages/cat-meta/cat-meta.module').then(m => m.CatMetaPageModule),
  },
  // {
  //   path: 'cat-select',
  //   loadChildren: () =>
  //     import('./pages/cat-select-catalog/cat-select-catalog.module').then(m => m.CatSelectCatalogPageModule),
  // },
  {
    path: 'cat-select-async',
    loadChildren: () =>
      import('./pages/cat-select-cat-async/cat-select-cat-async.module').then(m => m.CatSelectCatAsyncPageModule),
  }, {
    path: 'pro-edit',
    loadChildren: () =>
      import('./pages/cat-select-profile/cat-select-profile.module').then(m => m.CatSelectProfilePageModule),
  }, {
    path: 'pro-group',
    loadChildren: () =>
      import('./pages/cat-select-profile-groups/cat-select-profile-groups.module').then(m => m.CatSelectProfileGroupsPageModule),
  }, {
    path: 'pro-back',
    loadChildren: () => import('./pages/cat-back/cat-back.module').then(m => m.CatBackPageModule)
  },
  // {
  //   path: 'about',
  //   loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
  // }, 
  {
    path: 'review',
    loadChildren: () => import('./pages/cat-review/cat-review.module').then(m => m.CatReviewPageModule),
  }, {
    path: 'load',
    loadChildren: () => import('./pages/cat-load/cat-load.module').then(m => m.CatLoadPageModule),
  }, {
    path: 'save',
    loadChildren: () => import('./pages/cat-save/cat-save.module').then(m => m.CatSavePageModule),
  }, {
    path: 'control/:id',
    loadChildren: () => import('./pages/cat-control/cat-control.module').then(m => m.CatControlPageModule),
  }, {
    path: 'cat-control',
    loadChildren: () => import('./pages/cat-control/cat-control.module').then(m => m.CatControlPageModule),
  },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
  // }, {
  //   path: 'support',
  //   loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule),
  // }, {
  //   path: 'tutorial',
  //   loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
  //   canLoad: [CheckTutorial],
  // },
  {
    path: 'saved-work',
    loadChildren: () => import('./pages/all-components/saved-work/saved-work.module').then(m => m.SavedWorkPageModule)
  },
  {
    path: 'cat-begin',
    loadChildren: () => import('./pages/cat-begin/cat-begin.module').then(m => m.CatBeginPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

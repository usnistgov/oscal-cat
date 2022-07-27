/*
 * Portions of this software was developed by employees of the National Institute
 * of Standards and Technology (NIST), an agency of the Federal Government and is
 * being made available as a public service. Pursuant to title 17 United States
 * Code Section 105, works of NIST employees are not subject to copyright
 * protection in the United States. This software may be subject to foreign
 * copyright. Permission in the United States and in foreign countries, to the
 * extent that NIST may hold copyright, to use, copy, modify, create derivative
 * works, and distribute this software and its documentation without fee is hereby
 * granted on a non-exclusive basis, provided that this notice and disclaimer
 * of warranty appears in all copies.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS' WITHOUT ANY WARRANTY OF ANY KIND, EITHER
 * EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTY
 * THAT THE SOFTWARE WILL CONFORM TO SPECIFICATIONS, ANY IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND FREEDOM FROM
 * INFRINGEMENT, AND ANY WARRANTY THAT THE DOCUMENTATION WILL CONFORM TO THE
 * SOFTWARE, OR ANY WARRANTY THAT THE SOFTWARE WILL BE ERROR FREE.  IN NO EVENT
 * SHALL NIST BE LIABLE FOR ANY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DIRECT,
 * INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES, ARISING OUT OF, RESULTING FROM,
 * OR IN ANY WAY CONNECTED WITH THIS SOFTWARE, WHETHER OR NOT BASED UPON WARRANTY,
 * CONTRACT, TORT, OR OTHERWISE, WHETHER OR NOT INJURY WAS SUSTAINED BY PERSONS OR
 * PROPERTY OR OTHERWISE, AND WHETHER OR NOT LOSS WAS SUSTAINED FROM, OR AROSE OUT
 * OF THE RESULTS OF, OR USE OF, THE SOFTWARE OR SERVICES PROVIDED HEREUNDER.
 */
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

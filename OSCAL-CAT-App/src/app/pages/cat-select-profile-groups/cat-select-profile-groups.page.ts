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
import { Component, OnInit, Optional, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


import { TreeItemEntry } from '../../providers/app-state/app-tree/tree-elements';
import { CatalogService } from '../../providers/oscal-data/catalog.service';
import { CatSelectCatAsyncPage } from '../cat-select-cat-async/cat-select-cat-async.page';


@Component({
  selector: 'oscal-cat-select-profile-groups',
  templateUrl: './cat-select-profile-groups.page.html',
  styleUrls: ['../cat-select-profile/cat-select-profile.page.scss', './../stylePages.scss'],
})
export class CatSelectProfileGroupsPage extends CatSelectCatAsyncPage implements OnInit {

  proInfo: Array<TreeItemEntry>;
  router: Router;
  mustGoBack = false;

  constructor(
    @Optional() @SkipSelf() theCatService: CatalogService,
    modalController: ModalController) {
    super(theCatService, modalController);
  }

  async ngOnInit() {
    console.log(`In mgOnInitProfile`);
    this.getTree();
  }

  getTree() {
    try {
      this.proInfo = this.cat.getTreeProfileStat();
      if (this.proInfo) {
        // console.log(`length0=${this.proInfo[0].children.length}`);
        this.mustGoBack = !this.proInfo;
      } else {
        // Uncomment line below to force a return back and select controls
        // this.router.navigateByUrl('/cat-select-async');
      }
    } catch (error) {
      console.log(`Error at the profile tree retrieval ${error}`);
    } finally {

    }
  }


  safeToShowTree(): boolean {
    if (this.mustGoBack) {
      return !this.mustGoBack;
    }
    if (!this.proInfo) {
      this.getTree();
    }
    return !!this.proInfo;
  }

}

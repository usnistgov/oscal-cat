import { Component, OnInit, Optional, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


import { TreeItemEntry } from '../../providers/app-state/app-tree/tree-elements';
import { CatalogService } from '../../providers/oscal-data/catalog.service';
import { CatSelectCatalogPage } from '../cat-select-catalog/cat-select-catalog.page';

@Component({
  selector: 'oscal-cat-select-profile-groups',
  templateUrl: './cat-select-profile-groups.page.html',
  styleUrls: ['../cat-select-profile/cat-select-profile.page.scss', './../stylePages.scss'],
})
export class CatSelectProfileGroupsPage extends CatSelectCatalogPage implements OnInit {

  proInfo: Array<TreeItemEntry>;
  router: Router;
  mustGoBack: boolean = false;

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

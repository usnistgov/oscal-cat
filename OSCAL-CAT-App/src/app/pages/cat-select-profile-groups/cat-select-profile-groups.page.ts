import { Component, OnInit, Optional, SkipSelf } from '@angular/core';
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
  constructor(
    @Optional() @SkipSelf() theCatService: CatalogService,
    modalController: ModalController) {
    super(theCatService, modalController);
  }

  async ngOnInit() {
    console.log(`In mgOnInitProfile`);
  }

  getTree() {
    this.proInfo = this.cat.getTreeProfileStat();
    // console.log(`length0=${this.proInfo[0].children.length}`);
    return this.proInfo;
  }
}

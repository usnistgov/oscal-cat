import { IonicModule } from '@ionic/angular';
import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';


import { CatalogService, } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry } from './../../../providers/app-state/app-tree/tree-elements';

@Component({
  selector: 'oscal-tree-profile',
  templateUrl: './tree-profile.component.html',
  styleUrls: ['../action-all-common/tree-styles.scss'],
})
export class TreeProfileComponent implements OnInit, OnChanges {
  @Input() treeNodes: Array<TreeItemEntry>;
  @Input() theCat: CatalogService;

  cat: CatalogService;
  name = 'ProfileTreeView';

  constructor() {
    this.cat = this.theCat;
    // this.groupsInfo = this.cat.getGroups();
    // console.log(`Groups = ${this.groupsInfo}`);
    // this.groups = this.cat.getTreeNodesStat();
    // console.log(`Profile Mode [Root] = ${this.profileMode}`);
  }

  ngOnInit() { }


  OnInit() { }


  public ngOnChanges(changes: SimpleChanges) {
  }

}

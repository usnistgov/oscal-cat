import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';


import { CatalogService, } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry } from './../../../providers/app-state/app-tree/tree-elements';

@Component({
  selector: 'oscal-tree-groups',
  templateUrl: './tree-groups.component.html',
  styleUrls: ['../action-all-common/tree-styles.scss'],
})
export class TreeGroupsComponent implements OnInit, OnChanges {
  @Input() treeNodes: Array<TreeItemEntry>;
  @Input() theCat: CatalogService;

  cat: CatalogService;
  name = 'GroupTreeView';

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

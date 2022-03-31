import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';

import { CatalogService } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry } from './../../../providers/app-state/app-tree/tree-elements';

@Component({
  selector: 'oscal-z-cat-tree-select',
  templateUrl: './z-cat-tree-select.component.html',
  styleUrls: ['../action-all-common/tree-styles.scss']
})
export class ZCatTreeComponent implements OnInit {
  @Input() treeNodes: Array<TreeItemEntry>;
  @Input() theCat: CatalogService;


  constructor() { }

  ngOnInit(): void {

  }

}

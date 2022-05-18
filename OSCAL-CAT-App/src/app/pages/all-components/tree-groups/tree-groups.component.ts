import { Component, Input, SimpleChanges, OnInit, OnChanges, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';


import { CatalogService, } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry } from './../../../providers/app-state/app-tree/tree-elements';
import { GestureController, IonItem } from '@ionic/angular';

@Component({
  selector: 'oscal-tree-groups',
  templateUrl: './tree-groups.component.html',
  styleUrls: ['../action-all-common/tree-styles.scss', './tree-groups.component.scss'],
})
export class TreeGroupsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() treeNodes: Array<TreeItemEntry>;
  @Input() theCat: CatalogService;

  @ViewChildren(IonItem, { read: ElementRef }) private groups: QueryList<ElementRef>;
  @ViewChildren(IonItem, { read: ElementRef }) private items: QueryList<ElementRef>;

  cat: CatalogService;
  name = 'GroupTreeView';

  constructor(private gestureCtrl: GestureController) {
    this.cat = this.theCat;
    // this.groups = this.cat.getCatGroupsList();
    // console.log(`Groups = ${this.groupsInfo}`);
    // this.groups = this.cat.getTreeNodesStat();
    // console.log(`Profile Mode [Root] = ${this.profileMode}`);
  }

  ngOnInit() {

    console.log(`Root: `);
    console.log(this.treeNodes);
  }

  OnInit() { }

  public ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit(): void {
    this.updateGestures();
    this.groups.changes.subscribe(() => console.log(this.groups));
  }

  updateGestures() {
    const items = this.items.toArray();
    const goals = this.groups.toArray();
  }

}

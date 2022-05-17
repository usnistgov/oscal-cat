import { Component, Input, SimpleChanges, OnChanges, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';


import { CatalogService } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry } from './../../../providers/app-state/app-tree/tree-elements';


@Component({
    selector: 'oscal-tree-cat',
    templateUrl: './tree-cat.component.html',
    styleUrls: ['../action-all-common/tree-styles.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TreeCatComponent implements OnInit, OnChanges {
    @Input() treeNodes: Array<TreeItemEntry>;
    @Input() theCat: CatalogService;

    // constructor(private splashScreen: SplashScreen) {
    constructor() {
        // this.cat = new CatalogService()
        // this.groupsInfo = this.cat.getGroups();
        // console.log(`Groups = ${this.groupsInfo}`);
        // this.groups = this.cat.getTreeNodesStat();
        // console.log(`Profile Mode [Root] = ${this.profileMode}`);
        // this.splashScreen.show(); //<-Requires Cordova & Native Executio
    }

    onInit() { }
    ngOnInit() { }

    public ngOnChanges(changes: SimpleChanges) {
    }


}

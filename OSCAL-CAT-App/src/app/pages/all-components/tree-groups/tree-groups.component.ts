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

  //cat: CatalogService;
  name = 'GroupTreeView';

  constructor(
    cat: CatalogService,
    private gestureCtrl: GestureController
  ) {
    // this.cat = this.theCat;
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

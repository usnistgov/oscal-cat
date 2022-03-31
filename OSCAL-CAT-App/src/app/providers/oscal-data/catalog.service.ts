import { Injectable, OnInit } from '@angular/core';

import { LogManagerService } from './../logging/log-manager.service';
import { TreeItemEntry, TreeNodeType } from './../app-state/app-tree/tree-elements';
import { Convert, Catalog, Control, ControlGroup, } from './../../interfaces/oscal-types/oscal-catalog.types';

// import {Catalog} from './../../../assets/oscal-cats/NIST_SP-800-53_rev4_catalog.json'

// import { CompileShallowModuleMetadata } from '@angular/compiler';
// import JSON_CAT from './NIST_SP-800-53_rev4_LOW-baseline_profile.json';
// '../../assets/oscal/nist-800-53-json/rev4/NIST_SP-800-53_rev4_catalog.json';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  catSelectionMustReset = true;
  workCatRemote = 'https://raw.groupsInfothubusercontent.com/usnistgov/OSCAL/master/content/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_catalog-min.json';
  workCatLocal = './../../../assets/oscal-cats/NIST_SP-800-53_rev4_catalog.json';
  jsonCatalog: any;
  groupsInit: any;
  catalog: Array<TreeItemEntry>;
  allGroups: Array<TreeItemEntry>;
  allControls: Array<TreeItemEntry>;
  treeCats: Array<TreeItemEntry>;
  treeProfile: Array<TreeItemEntry>;
  catExample: any;
  wasHere: boolean;
  asyncCount = 0;
  deepLog: LogManagerService;
  // private handler: HttpHandler = new HttpXhrBackend();
  // private http = new HttpClient(this.handler);private http: HttpClient
  constructor() {
    // Way 1 - Stopped working with variable, but works with literal
    // CAT: './../../assets/oscal-cats/NIST_SP-800-53_rev4_catalog.json'
    this.deepLog = new LogManagerService();
    const start = new Date().getTime();
    // this.catExample = require('./../../../assets/oscal-cats/NIST_SP-800-53_rev4_catalog.json');
    this.catExample = require('./../../../assets/oscal-cats/NIST_SP-800-53_rev4_catalog.json');
    const end = new Date().getTime();
    console.log(`Start:${start}\t end:${end}\ttime:${end - start}`);

    // LOW-RES: './../../assets/oscal-profiles/baselines-800-53-rev4/NIST_SP-800-53_rev4_LOW-baseline-resolved-profile_catalog.json'
    // this.catExample = require('./../../assets/oscal-profiles/baselines-800-53-rev4
    // /NIST_SP-800-53_rev4_LOW-baseline-resolved-profile_catalog.json');

    // console.log(`Cat-File Object = ${Object.keys(this.root)}`);
    const x = this.workCatLocal;
    this.groupsInit = this.getRawGroups();
    // this.root = require(x);

    /*
    this.http.get(this.workCatRemote).subscribe(data => {
      this.jsonCatalog = data;
    });
    console.log('===>>> this.jsonCatalog');
    console.log(this.jsonCatalog);

    if (!this.root) {
      this.root = this.jsonCatalog;
    }
    */

    // Way 2 (has trouble with Provider)
    // this.jsonCatalog = this.http.get(this.workCat).pipe((res: any) => res.json());
    // this.jsonCatalog = Convert.toCatalog(this.catalog);
    // console.log(this.catalog);
    // console.log(this.jsonCatalog);

    this.allGroups = this.allGroups || new Array<TreeItemEntry>();
    this.allControls = this.allControls || new Array<TreeItemEntry>();
  }

  OnInit() {
  }

  getCatalog() { return this.catExample; }



  getCatControlsList(refresh: boolean = true) {
    this.treeCats = this.treeCats || this.getTreeNodesStat();
    if (refresh || !this.allControls) {
      this.allControls = new Array<TreeItemEntry>();
      this.treeCats.forEach(node => this.allControls.push(...getOnlyControls(node)));
    }
    return this.allControls;
  }

  cloneTreeArray(tree: Array<TreeItemEntry>): Array<TreeItemEntry> {
    if (tree) {
      return this.deepCopyNodeArray(tree);
    }
    return null;
  }

  deepCopyNodeArray(nodeArray: Array<TreeItemEntry>): Array<TreeItemEntry> {
    const newCopy = new Array<TreeItemEntry>();
    if (nodeArray) {
      const arrayLen = nodeArray.length;
      for (let i = 0; i < arrayLen; i++) {
        // const newNode = JSON.parse(JSON.stringify(nodeToClone));
        // newCopy.push(JSON.parse(JSON.stringify(localNodeArray[i])));
        newCopy.push(nodeArray[i].deepCopyNode4Profile());
      }
    }
    return newCopy;
  }

  getTreeProfileStat(): Array<TreeItemEntry> {
    // Either reuse (if exists) or create a new CAT-TREE
    this.treeCats = this.treeCats || this.getTreeNodesStat();
    if (!this.catSelectionMustReset) {
      if (this.treeCats[0] && this.treeCats[0].hasSomeIncluded) {
        return undefined;
      } else if (!this.treeCats[0]) {
        return undefined;
      }
    }
    let nodesCopy: Array<TreeItemEntry>;
    if (this.catSelectionMustReset || !this.treeProfile) {
      console.log(`Must Create New Copy Val(MustReset)=${this.catSelectionMustReset}; Value(Tree)=${this.treeProfile}`);
      nodesCopy = this.deepCopyNodeArray(this.treeCats);
    } else {
      return this.treeProfile;
    }
    // Filter function declaration
    const profileFilter =
      (node: TreeItemEntry) => {
        if (node && node.children) {
          node.children = node.children.filter((child: TreeItemEntry) => profileFilter(child));
          return (node.hasSomeIncluded());
        }
      };
    const filteredNodes = nodesCopy.filter((node: TreeItemEntry) => profileFilter(node));
    if (this.catSelectionMustReset || !this.treeProfile) {
      this.treeProfile = this.deepCopyNodeArray(this.treeCats);
      this.catSelectionMustReset = false;
    }
    console.log(`Made New Copy MustReset=${this.catSelectionMustReset} with ${this.treeProfile[0].key} `);
    return this.treeProfile;
  }

  async getTreeNodesAsync(): Promise<Array<TreeItemEntry>> {
    this.asyncCount++;
    // if (this.wasHere) {
    //   console.log(`getTreeNodesAsync: B4 Promise ${this.asyncCount} Times`);
    //   return;
    // }
    this.wasHere = true;
    console.log(`getTreeNodesAsync: B4 Promise ${this.asyncCount} Times`);
    if (this.treeCats) {
      return Promise.resolve(this.treeCats);
    }
    return Promise.resolve(this.getTreeNodesStat());
  }

  getTreeNodesStat(): Array<TreeItemEntry> {
    const start = Math.floor(Date.now());
    if (this.treeCats) {
      const end = Math.floor(Date.now());
      console.log(`Reused Cat in ${end - start} milliseconds`);
      return this.treeCats;
    } else {
      this.treeCats = this.prepareGroupsForTree(this.getRawGroups());
      const end = Math.floor(Date.now());
      console.log(`Loaded Cat in ${end - start} milliseconds`);
      return this.treeCats;
    }
  }

  getCatGroupsList() {
    if (!this.allGroups) {
      this.getTreeNodesStat();
    }
    return this.allGroups || [];
  }

  getRawGroups() {
    // console.log(`Getting Groups: GetGroups = ${this.groupsInit}`);
    if (!this.groupsInit) {
      if (this.catExample && !this.groupsInit) {
        this.groupsInit = [... this.catExample.catalog.groups];
      }
    }

    this.deepLog.logData(this.groupsInit, 1);
    return this.groupsInit;
  }

  getMetaData() { if (this.catExample) { return this.catExample.catalog.metadata; } }

  createMasterCatNode(): TreeItemEntry {
    const retNode = new TreeItemEntry();
    retNode.parent = null;
    retNode.key = '800-53 Rev4 Catalog';
    retNode.label = '800-53 Rev4 Catalog';
    retNode.included = false;
    retNode.open = false;
    retNode.nodeType = TreeNodeType.Catalog;
    retNode.nodeClass = `cat`;
    retNode.children = new Array<TreeItemEntry>();
    retNode.toolTip = retNode.getNodeToolTip(retNode);
    return retNode;
  }

  createGroupTreeNode(group, parentNode: TreeItemEntry = null): TreeItemEntry {
    const retNode = new TreeItemEntry();
    retNode.parent = parentNode || null;
    retNode.key = group.id.toUpperCase();
    retNode.label = `${group.title} (${group.id.toUpperCase()})`;
    retNode.included = false;
    retNode.open = false;
    retNode.nodeType = TreeNodeType.Group;
    retNode.nodeClass = `${group.class}`;
    retNode.toolTip = retNode.getNodeToolTip(retNode);
    return retNode;
  }

  createControlTreeNode(control, parentNode: TreeItemEntry = null): TreeItemEntry {
    const retControl = new TreeItemEntry();
    retControl.parent = parentNode || null;
    retControl.key = control.id.toUpperCase();
    retControl.label = `${control.title} (${control.id.toUpperCase()})`;
    retControl.included = false;
    retControl.partsCount = 0;
    retControl.nodeType = TreeNodeType.Control;
    retControl.nodeClass = `${(control.class ? control.class : 'none')}`;
    retControl.open = false;
    if (control.parameters) {
      retControl.partsCount = control.parameters.length;
    }
    retControl.toolTip = retControl.getNodeToolTip(retControl);
    return retControl;
  }

  createEnhancementTreeNode(control, parentNode: TreeItemEntry = null): TreeItemEntry {
    const retControl = new TreeItemEntry();
    retControl.parent = parentNode || null;
    retControl.key = control.id.toUpperCase();
    retControl.label = `${parentNode.key.toUpperCase()} Enhancement: ${control.title} (${control.id.toUpperCase()})`;
    retControl.included = false;
    retControl.partsCount = 0;
    retControl.nodeType = TreeNodeType.Enhancement;
    retControl.nodeClass = `${(control.class ? control.class : 'none')}`;
    retControl.open = false;
    if (control.parameters) {
      retControl.partsCount = control.parameters.length;
    }
    retControl.toolTip = retControl.getNodeToolTip(retControl);
    return retControl;
  }

  getGroupsForTree() {

  }

  /**
   * The original JSON-TS object looping over the controls
   *
   * @param {*} groupsInfo
   * @returns
   * @memberof CatalogService
   */
  prepareGroupsForTree(groupsInfo: any) {
    if (this.treeCats) {
      console.log(`Tree Group Reuse!!! `);
      return this.treeCats;
    } else {
      const returnGroups4Tree: TreeItemEntry = this.createMasterCatNode();
      console.log(`Return Groups: a G.I. = ${groupsInfo}`);
      if (groupsInfo) { // The case of 800-53
        groupsInfo.forEach((catGroup, catGroupId) => {
          if (catGroup.class && catGroup.controls) {
            const newCatGroup: TreeItemEntry = this.createGroupTreeNode(catGroup);
            newCatGroup.parent = returnGroups4Tree;
            if (catGroup.controls) {
              newCatGroup.partsCount = catGroup.controls.length;
              newCatGroup.children = new Array<TreeItemEntry>(),
                catGroup.controls.forEach(catControl => {
                  const newCatControl: TreeItemEntry
                    = this.createControlTreeNode(catControl, newCatGroup); // Count parameters

                  if (catControl.controls) {
                    // console.log(`Control ${newCatControl.key} has ${catControl.controls.length} enhancements`);
                    newCatControl.children = new Array<TreeItemEntry>();
                    catControl.controls.forEach(catEnhancement => {
                      const newCatEnhancement: TreeItemEntry
                        = this.createEnhancementTreeNode(catEnhancement, newCatControl); // Count parameters
                      newCatControl.children.push(newCatEnhancement);
                    }
                    );
                  }
                  newCatControl.parent = newCatGroup;
                  newCatGroup.children.push(newCatControl);
                  // this.allControls.push(newCatControl);
                });
            }
            returnGroups4Tree.children.push(newCatGroup);
            // this.allGroups.push(newCatGroup);
          }
        });
      }
      returnGroups4Tree.partsCount = returnGroups4Tree.children.length;
      this.treeCats = [returnGroups4Tree];
      return this.treeCats;
    }
  }



  public prepareGroupsForTreeParts(groupsInfo: ControlGroup | Control) {
    if (this.treeCats) {
      console.log(`Tree Group Reuse!!! `);
      return this.treeCats;
    } else {
      const returnGroups4Tree: TreeItemEntry = this.createMasterCatNode();
      console.log(`Return Groups: a G.I. = ${groupsInfo}`);
      if (groupsInfo) { // The case of 800-53
        groupsInfo.controls.forEach((catGroup: ControlGroup, catGroupId) => {
          if (catGroup.class && catGroup.controls) {
            const newCatGroup: TreeItemEntry = this.createGroupTreeNode(catGroup);
            newCatGroup.parent = returnGroups4Tree;
            this.prepareControlsParts(catGroup, newCatGroup);
            returnGroups4Tree.children.push(newCatGroup);
            // this.allGroups.push(newCatGroup);
          }
        });
      }
      returnGroups4Tree.partsCount = returnGroups4Tree.children.length;
      this.treeCats = [returnGroups4Tree];
      return this.treeCats;
    }
  }



  public prepareControlsParts(catGroup: ControlGroup, newCatGroup: TreeItemEntry) {
    if (catGroup.controls) {
      newCatGroup.partsCount = catGroup.controls.length;
      newCatGroup.children = new Array<TreeItemEntry>(),
        catGroup.controls.forEach(
          (catControl: Control) => {
            const newCatControl: TreeItemEntry = this.createControlTreeNode(catControl, newCatGroup); // Count parameters

            this.prepareControlEnhancementsParts(catControl, newCatControl);
            newCatControl.parent = newCatGroup;
            newCatGroup.children.push(newCatControl);
          });
    }
  }

  public prepareControlEnhancementsParts(catControl: Control, newCatControl: TreeItemEntry) {
    if (catControl.controls) {
      // console.log(`Control ${newCatControl.key} has ${catControl.controls.length} enhancements`);
      newCatControl.children = new Array<TreeItemEntry>();
      catControl.controls.forEach(catEnhancement => {
        const newCatEnhancement: TreeItemEntry = this.createEnhancementTreeNode(catEnhancement, newCatControl); // Count parameters
        newCatControl.children.push(newCatEnhancement);
      }
      );
    }
  }
}





export const getOnlyControls = (node: TreeItemEntry) => {
  const list = new Array<TreeItemEntry>();
  if (node.nodeType === TreeNodeType.Control) {
    list.push(node);
  }
  if (node.children) {
    node.children.forEach(child => {
      const controls = getOnlyControls(child);
      if (controls) {
        list.push(...controls);
      }
    });
  }
  return list;
};



// That's the 1st way to get JSON files in
//
// import * as data from './data.json';
// cat: any = (data as any).default;
//


// The 2nd way
export const getCatalogControls = () => {
  // let httpHandler = new HttpHandler();
  // httpClient: HttpClient = HttpClient.createDefault();
};

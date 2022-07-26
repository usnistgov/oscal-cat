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
import { Injectable } from '@angular/core';

export enum TreeNodeType {
    Catalog = 'CATALOG',
    Group = 'GROUP',
    Control = 'CONTROL',
    Enhancement = 'ENHANCEMENT',
    Objective = 'OBJECTIVE',
    Statement = 'STATEMENT',
}

@Injectable({
    providedIn: 'root'
})
export class TreeItemEntry {
    // export class Catalog { constructor(private cat: any) {} }
    key: string;
    label: string;
    included?: boolean;
    someIncluded?: boolean;
    open?: boolean;
    children?: Array<TreeItemEntry>;
    nodeClass?: string;
    nodeType: TreeNodeType;
    partsCount?: number;
    parent?: TreeItemEntry;
    toolTip?: string;

    baseline?: Array<string>;
    basePriority?: Array<string>;

    constructor() {
        // this.included = false;
    }


    cloneAttribute(attrToClone: any) {
        if (null === attrToClone || 'object' !== typeof attrToClone) {
            return attrToClone;
        }
        // Handle Date
        if (attrToClone instanceof Date) {
            const newAttr = new Date();
            newAttr.setTime(attrToClone.getTime());
            return newAttr;
        }
        // Handle Array
        if (attrToClone instanceof Array) {
            const newAttr = [];
            for (let i = 0, len = attrToClone.length; i < len; i++) {
                newAttr[i] = this.cloneAttribute(attrToClone[i]);
            }
            return newAttr;
        }
    }

    deepNodeClone(nodeToClone: TreeItemEntry): TreeItemEntry {
        // Idea inspiration comes from
        // https://stackoverflow.com/questions/28150967/typescript-cloning-object/42758108
        const newNode = new TreeItemEntry();
        // Handle the 3 simple types, and null or undefined
        if (null === nodeToClone || 'object' !== typeof nodeToClone) {
            return nodeToClone;
        }
        // Handle Object
        if (nodeToClone instanceof TreeItemEntry) {
            for (const attr in nodeToClone) {
                if (nodeToClone.hasOwnProperty(attr)) {
                    newNode[attr] = this.cloneAttribute(nodeToClone[attr]);
                } else {
                    console.log(`Impossible situation!!!`);
                    newNode[attr] = nodeToClone[attr];
                }
            }
            return newNode;
        }
        throw new Error('Unable to copy obj! Its type isn\'t supported.');
    }

    getNodeCopyNoKids(srcNode: TreeItemEntry, parentNode: TreeItemEntry = null): TreeItemEntry {
        const newNode = new TreeItemEntry();
        newNode.key = srcNode.key;
        newNode.label = srcNode.label;
        newNode.included = srcNode.included;
        newNode.open = srcNode.open;
        newNode.nodeClass = srcNode.nodeClass;
        newNode.nodeType = srcNode.nodeType;
        newNode.toolTip = srcNode.toolTip || this.getNodeToolTip(srcNode);
        if (parentNode) {
            newNode.parent = parentNode;
        } else {
            newNode.parent = null;
        }
        return newNode;
    }


    getNodeToolTip(item: TreeItemEntry): string {
        // const openCloseFlag = (!item.open && item.children);
        const openCloseVerb = (!item.open && item.children) ? 'Open ' : 'Close ';
        let returnValue: string;
        if (item.isCatalog()) {
            returnValue = `${openCloseVerb} Catalog ${item.key}`;
        } else if (item.isGroup()) {
            returnValue = `${openCloseVerb} '${item.key}' Group Controls`;
        } else if (item.isControl()) {
            returnValue = `${openCloseVerb} ${item.key} Control Enhancements`;
        } else {
            returnValue = `${openCloseVerb} Children`;
        }
        // console.log(`getNodeToolTip => Item:${item.label}; nodeType:${item.nodeType}`);
        return returnValue;
    }


    deepCopyNode4Profile(nodeToClone: TreeItemEntry = null, parentNode: TreeItemEntry = null): TreeItemEntry {
        const srcNode = nodeToClone || this;
        // const newNode = this.deepNodeClone(srcNode)
        // const newNode = JSON.parse(JSON.stringify(nodeToClone));
        let newNode: TreeItemEntry;
        if (srcNode.hasSomeIncluded()) {
            newNode = this.getNodeCopyNoKids(srcNode, parentNode);
            if (srcNode.children && srcNode.children.length > 0) {
                newNode.children = new Array<TreeItemEntry>();
                srcNode.children.forEach((kidNode: TreeItemEntry) => {
                    if (!kidNode) {
                        return;
                    } else {
                        let newOne: TreeItemEntry;
                        if (kidNode && (kidNode.hasSomeIncluded())) {
                            newOne = this.getNodeCopyNoKids(kidNode, newNode);
                            // const newOne = this.deepCopyNode4Profile(kidNode, newNode);
                            if (kidNode.children && kidNode.children.length > 0) {
                                newOne.children = new Array<TreeItemEntry>();
                                kidNode.children.forEach(
                                    (grandKid: TreeItemEntry) => {
                                        let newTwo: TreeItemEntry;
                                        if (grandKid && (grandKid.hasSomeIncluded())) {
                                            newTwo = this.getNodeCopyNoKids(grandKid, kidNode);
                                            if (grandKid.children && grandKid.children.length > 0) {
                                                newTwo.children = new Array<TreeItemEntry>();
                                                grandKid.children.forEach(
                                                    (grandKid2: TreeItemEntry) => {
                                                        let newThree: TreeItemEntry;
                                                        if (!grandKid2) {
                                                            return;
                                                        } else {
                                                            if (grandKid2 && (grandKid2.included || grandKid2.hasSomeIncluded())) {
                                                                newThree = this.getNodeCopyNoKids(grandKid2, newTwo);
                                                                if (grandKid2.children && grandKid2.children.length > 0) {
                                                                    newThree.children = new Array<TreeItemEntry>();
                                                                    console.log(`Element ${grandKid2.key} has children`)
                                                                }
                                                            }
                                                        }
                                                        newTwo.pushNewKidIn(newThree);
                                                    });
                                            }
                                        }
                                        newOne.pushNewKidIn(newTwo);
                                    });
                            }
                            newNode.pushNewKidIn(newOne);
                        }
                    }
                });
                newNode.partsCount = newNode.children ? newNode.children.length : 0;
            }
        }
        return newNode;
    }

    pushNewKidIn(newKid: TreeItemEntry) {
        if (newKid) {
            newKid.setKidsCount();
            this.children.push(newKid);
        }
    }

    setKidsCount() {
        if (this && this.children) {
            this.partsCount = this.children.length;
        }
    }

    deepCopyChildren(srcChildren: Array<TreeItemEntry>, newParentNode: TreeItemEntry) {
        // This is an attempt of recursive tree-kids duplication.
        // Unfortunately, it overruns the browser stack. (Fix it if you can)
        newParentNode.children = new Array<TreeItemEntry>();
        if (srcChildren) {
            srcChildren.forEach((kid: TreeItemEntry) => {
                if (kid && kid.hasSomeIncluded()) {
                    const newOne = this.deepCopyNode4Profile(kid, newParentNode);
                    newParentNode.children.push(newOne, newParentNode);
                }
            });
        }
    }

    isControl(): boolean {
        return (this.nodeType === TreeNodeType.Control);
    }

    isGroup(): boolean {
        return (this.nodeType === TreeNodeType.Group);
    }

    isCatalog(): boolean {
        return (this.nodeType === TreeNodeType.Catalog);
    }

    isEnhancement(): boolean {
        return (this.nodeType === TreeNodeType.Enhancement);
    }

    private setAllChildrenTo(item: TreeItemEntry, toInclude: boolean) {
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                // console.log(`Flip Children ==> Item ${item.key}; Setting Children To: ${toInclude};`);
                child.included = toInclude;
                if (child.children && item.children.length > 0) {
                    this.setAllChildrenTo(child, toInclude);
                }
            });
        }
        item.open = true;
    }

    flipCheck(setTo: boolean) { // Only call after the change has happened for the control!!!!!
        const was = this.included;
        let changingTo: boolean;
        let prefix = '>>> UI onChange FLIP';
        if (this.included === undefined || this.included === null) {
            changingTo = true;
            prefix += ' #1: ';
        } else {
            changingTo = !this.included;
            prefix += ' #2 ===> ';
        }
        console.log(`${prefix} Setting ${this.key} to ${changingTo}; This:${this.included}; Was:${was}; UI Source ${setTo}}`);
        this.flipItemRelatives(changingTo);
        // this.included = changingTo; // !!! NEVER !!! do this inside onClick event !!!
    }

    flipRadio(changeTo: boolean) { // For Radio compatibility
        this.included = changeTo;
        this.flipItemRelatives(changeTo);
    }

    flipItemRelatives(changingTo: boolean) {
        // document.body.classList.add('form-busy');
        console.log(`1. In Flip Item ==> Item ${this.key}; changeTo: ${changingTo}; Item Is ${this.included}`);
        if (this.children) {
            this.setAllChildrenTo(this, changingTo);
        }
        // console.log(`1. NodeType = ${this.nodeType}; CurrentValue = ${this.included}; Parent Value = ${this.parent.included}`);
        if (this.parent) {
            this.parentFlip(this.parent, changingTo);
        }
        // Special case of the controls/enhancements
        if (this.isEnhancement() && this.parent) {
            this.parent.included = this.parent.hasSomeIncluded() || changingTo;
        }
        // document.body.classList.remove('form-busy');
        console.log(`2. ==> NodeType = ${this.nodeType}; CurrentValue = ${this.included}; Parent Value = ${this.parent.included}`);
    }

    private parentFlip(node: TreeItemEntry, willBe: boolean) {
        return;
    }

    private parentNodeUpdate(node: TreeItemEntry) {
        const parentWasIncluded = node.included;
        console.log(`1-1. nodeUpdate(Cascade):==> Parent:${node.nodeType}-${node.key}; Parent.In->${node.included};`);
        node.included = node.hasAllIncluded();
        if (!node.included && node.hasAllExcluded()) {
            node.included = false;
        }
        if ((node.included ? !parentWasIncluded : parentWasIncluded) && node.parent) {
            this.parentNodeUpdate(node.parent);
        }
        console.log(`1-2. nodeUpdate(Cascade):==> Parent:${node.nodeType}-${node.key}; Parent.In->${node.included};`);

    }

    private directParentUpdate() {
        const srcNodeWillBeIn = !this.included;
        const parentWasIncluded = this.parent.included;
        this.parent.someIncluded = this.parent.hasSomeIncluded() || srcNodeWillBeIn;
        console.log(`1. directParentUpdate:==> Parent:${this.parent.nodeType}-${this.parent.key}; Parent.In->${this.parent.included}; ChildWillBe->${srcNodeWillBeIn}`);
        if (!parentWasIncluded) {
            console.log(`2.0`);
            console.log(`!!! Has All But This = ${this.parentHasAllButThisIncluded()}`);
            if (this.parent.isControl() && this.isEnhancement()) {
                this.parent.included = this.parent.hasSomeIncluded() || srcNodeWillBeIn;
                console.log(`2.0-x-x`);
            } else {
                if (srcNodeWillBeIn) {
                    console.log(`2-1. directParentUpdate:==> Parent:${this.parent.nodeType}-${this.parent.key}; Parent.In->${this.parent.included}; ChildWillBe->${srcNodeWillBeIn}`);
                    this.parent.included = this.parentHasAllButThisIncluded();
                } else {
                    this.parent.included = false;
                    console.log(`2-2. directParentUpdate:==> Parent:${this.parent.nodeType}-${this.parent.key}; Parent.In->${this.parent.included}; ChildWillBe->${srcNodeWillBeIn}`);
                }
            }
        } else {
            if (!srcNodeWillBeIn) {
                if (this.parent.isControl() && this.isEnhancement()) {
                    this.parent.included = this.parent.hasSomeIncluded() || srcNodeWillBeIn;
                } else {
                    this.parent.included = !this.parentHasAllButThisExcluded() && srcNodeWillBeIn;
                }
                console.log(`2-3. directParentUpdate:==> Parent:${this.parent.nodeType}-${this.parent.key}; Parent.In->${this.parent.included}; ChildWillBe->${srcNodeWillBeIn}`);
            } else {
                this.parent.included = this.parentHasAllButThisIncluded();
                console.log(`2-4. directParentUpdate:==> Parent:${this.parent.nodeType}-${this.parent.key}; Parent.In->${this.parent.included}; ChildWillBe->${srcNodeWillBeIn}`);
            }
        }
        if ((this.parent.included !== parentWasIncluded) && this.parent.parent) {
            this.parentNodeUpdate(this.parent.parent);
        }
        console.log(`3-1. directParentUpdate:==> Parent:${this.parent.nodeType}-${this.parent.key}; Parent.In->${this.parent.included}; ChildWillBe->${srcNodeWillBeIn}`);
        return;
    }

    nodeOnCheck() {
        const srcItem = this;
        const srcNodeValueWillBe = !srcItem.included;
        if (this.children) {
            this.setAllChildrenTo(this, srcNodeValueWillBe);
        }
        if (!srcItem.parent) {
            return;
        } else {
            this.directParentUpdate();
        }
    }


    hasSomeIncluded(): boolean {
        return hasAnyIncluded(this);
    }

    hasSomeExcluded(): boolean {
        return hasAnyExcluded(this);
    }

    hasAllIncluded(): boolean {
        return hasAllChildrenIncluded(this);
    }

    hasAllExcluded(): boolean {
        return hasAllChildrenExcluded(this);
    }

    parentHasAllButThisIncluded() {
        let allIn = false;
        if (this.parent) {
            allIn = hasAllChildrenButThisIncluded(this);
        }
        return allIn;
    }

    parentHasAllButThisExcluded() {
        let allOut = false;
        if (this.parent) {
            allOut = hasAllChildrenButThisExcluded(this);
        }
        return allOut;
    }


}

// Universal attachment functions can be used on the object 
// or can be used for tree-item
const hasAllChildrenIncluded = (node: TreeItemEntry) => {
    let retValue = true;
    if (!node.children) {
        return node.included;
    } else {
        retValue = retValue && node.included;
        node.children.forEach(child => {
            retValue = retValue && child.included;
            // child.hasAllIncluded();
            if (!retValue) {
                return retValue;
            } // Premature optimization, might skip for children split
        });
    }
    return retValue;
};

const hasAllChildrenExcluded = (node: TreeItemEntry) => {
    let retValue = true;
    if (!node.children) {
        return !node.included;
    } else {
        retValue = retValue && !node.included;
        node.children.forEach(child => {
            retValue = retValue && child.included;
            // && child.hasAllExcluded();
            if (!retValue) {
                return retValue;
            } // Premature optimization, might skip for children split
        });
    }
    return retValue;
};

const hasAnyIncluded = (node: TreeItemEntry) => {
    let retValue = false;
    if (!node.children) {
        return node.included;
    } else {
        retValue = retValue || node.included;
        node.children.forEach(child => {
            try {
                if (child) {
                    retValue = retValue || child.hasSomeIncluded();
                    if (retValue) { return retValue; } // Premature optimization, might skip for children split
                }
            } catch (e) {
                console.log(`Looking @ Key:${child.key}; ${child.label}; Exception ${e}`);
            }
        });
    }
    return retValue;
};

const hasAnyExcluded = (node: TreeItemEntry) => {
    let inverted = true;
    if (!node.children) {
        return !node.included;
    } else {
        inverted = inverted && node.included; // The weird logic, but correct
        node.children.forEach(child => {
            inverted = inverted && !child.hasSomeExcluded();
            if (!inverted) { return !inverted; } // Premature optimization, might skip for children split
        });
    }
    return !inverted;
};

const hasAllChildrenButThisIncluded = (nixedChildNode: TreeItemEntry) => {
    let retValue = true;
    const parentNode: TreeItemEntry = nixedChildNode.parent;
    if (!parentNode.children) {
        // This is totally messed up though !!!
        return parentNode.included;
    } else {
        parentNode.children.forEach(child => {
            if (child.key !== nixedChildNode.key) {
                retValue = retValue && child.included; // This is shallow comparison
                // retValue = retValue && child.hasAllIncluded(); // <= This is deep comparison
            }
            if (!retValue) {
                return retValue;
            } // Premature optimization, but might skip for children split
        });
    }
    return retValue;
};

const hasAllChildrenButThisExcluded = (nixedChildNode: TreeItemEntry) => {
    let retValue = true;
    const parentNode: TreeItemEntry = nixedChildNode.parent;
    if (!parentNode.children) {
        return parentNode.included;
    } else {
        parentNode.children.forEach(child => {
            if (child.key !== nixedChildNode.key) {
                retValue = retValue && !child.included;
                // retValue = retValue && child.hasAllExcluded(); // <= This is deep comparison
            }
            if (!retValue) {
                return retValue;
            } // Premature optimization, but might skip for children split
        });
    }
    return retValue;
};

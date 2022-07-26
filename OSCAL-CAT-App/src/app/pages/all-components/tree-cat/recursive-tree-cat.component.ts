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
import { Component, ElementRef, Input, IterableDiffers, OnChanges, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { RouterModule, Router, NavigationExtras, } from '@angular/router';
import { AlertController, } from '@ionic/angular';
import { Observable, of, from } from 'rxjs';


import { CatalogService, } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry, TreeNodeType } from './../../../providers/app-state/app-tree/tree-elements';
import { AllTreesBaseComponent } from './all-tree-base';

@Component({
    selector: '[recursive-tree-cat]',
    templateUrl: './recursive-tree-cat.component.html',
    styleUrls: ['../action-all-common/tree-styles.scss'],
})
export class RecursiveTreeCatComponent extends AllTreesBaseComponent {
    @Input() level: number;
    @Input() label: string;
    @Input() children: Array<TreeItemEntry>;
    @Input() parent: TreeItemEntry;
    @Input() theCat: CatalogService;



    // cat: CatalogService;
    self = this;
    // private navigateParams = new NavParams();
    alertControl: AlertController;
    constructor(
        public router: Router,
        public cat: CatalogService
    ) {
        super();
        this.alertControl = new AlertController();
    }

    onJoinNodeCheck(item: TreeItemEntry) {
        if (!this.cat.catSelectionMustReset) {
            this.cat.catSelectionMustReset = true;
            console.log(`Reset catSelectionMustReset to: ${this.cat.catSelectionMustReset}`);
        }
        item.nodeOnCheck();
    }

    closeOpen(item: TreeItemEntry) {
        item.open = !item.open;
    }

    getChildren(): Observable<TreeItemEntry> {
        // return Observable.of(this.children);
        return null;
    }

    // flipItemTo(item: TreeItemEntry, changingTo?: boolean) {
    //     // document.body.classList.add('form-busy');
    //     console.log(`In Flip Item ==> Item ${item.key}; changeTo: ${changingTo}; Item Is ${item.included}`);
    //     item.included = changingTo;
    //     if (item.children) {
    //         this.childrenSetTo(item, changingTo);
    //     }
    //     if (item.parent) {
    //         this.parentFlip(item.parent);
    //     }
    //     // document.body.classList.remove('form-busy');
    // }

    private childrenSetTo(item: TreeItemEntry, toInclude: boolean) {
        item.children.forEach(child => {
            console.log(`Flip Children ==> Item ${item.key}; In: ${toInclude};`);
            child.included = toInclude;
            if (child.children) {
                this.childrenSetTo(child, toInclude);
            }
        });
        item.open = true;
    }



    navigateToControl(item: TreeItemEntry) {
        const urlParams: NavigationExtras = { state: { ctrlId: item.key, catId: undefined, entity: item } };
        console.log(`Navigating to cat-control with ${item}`);
        console.log(`Item is packed as : ${urlParams}`);
        this.router.navigate(['cat-control'], urlParams);
    }

    /**
     * Function generates the pop-up
     * @param item : the Tree-Item-Entry to generate the popup for
     */
    async presentPrompt(item: TreeItemEntry) {
        console.log(item);
        const isGroup: boolean = item.children ? true : false;
        const nodeType = item.nodeType.toString();
        const prefix: string = nodeType[0].toUpperCase() + nodeType.substr(1).toLowerCase();
        console.log(`nodeType:${nodeType} => Prefix = ${prefix}`);
        const summaryHtml: string = isGroup ? `<strong> ${prefix} ${item.key} Contains:<br /><br /> </strong>` +
            `&nbsp;&nbsp;Total of ${item.partsCount} Controls/Subgroups. <br /><br />` +
            `&nbsp;&nbsp;Control Short Names Span from ${item.children[0].key} to  ${item.children[item.partsCount - 1].key}.`
            :
            `<strong> ${prefix} ${item.key} </strong> ` +
            ` ${(item.partsCount > 0) ? 'Has ' : 'Has no'} ` +
            `${(item.partsCount > 0) ? item.partsCount.toString() : ''} Parameters.`;
        const alert = await this.alertControl.create({
            header: `${prefix} ${item.key} Info`,
            subHeader: `Full Name: ${item.label}:`,
            message: summaryHtml,
            cssClass: 'oscal-prompt-class',

            /*inputs: [
                {
                    name: 'group',
                    value: prefix + ': ' + item.label + '\n\t\t' + item.label + '\n\t\t' + item.label +
                        '\n\t\t' + item.label + '\n\t\t' + item.label,
                    type: 'textarea',
                    disabled: true,
                },
            ],*/
            buttons: [
                {
                    text: 'Close',
                    role: 'cancel',
                    handler: data => {
                        return false;
                    }
                },
                {
                    text: (item.nodeType === TreeNodeType.Control) ? 'Details...' : '',
                    handler: data => {
                        if (item.key) {
                            // Follow to Details Page
                        } else {
                            // Same as Close
                            return false;
                        }
                    }
                }
            ]
        });
        await alert.present();
    }

}
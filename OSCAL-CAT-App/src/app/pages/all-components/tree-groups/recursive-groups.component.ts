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
import { IonicModule, GestureController, Gesture } from '@ionic/angular';
import { RouterModule, Router, NavigationExtras, } from '@angular/router';
import { AlertController, } from '@ionic/angular';
import {
    AfterViewInit,
    Component, ElementRef, Input, IterableDiffers,
    OnChanges, QueryList, SimpleChanges, ViewChildren
} from '@angular/core';

import { CatalogService, } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry, TreeNodeType } from './../../../providers/app-state/app-tree/tree-elements';

@Component({
    selector: '[recursive-tree-groups]',
    templateUrl: './recursive-groups.component.html',
    styleUrls: ['../action-all-common/tree-styles.scss'],
})
export class RecursiveGroupsComponent implements AfterViewInit {
    @Input() level: number;
    @Input() label: string;
    @Input() children: Array<TreeItemEntry>;
    @Input() parent: TreeItemEntry;

    @ViewChildren('node', { read: ElementRef }) dragNodes: QueryList<ElementRef>;
    @ViewChildren('node', { read: ElementRef }) dropNodes: QueryList<ElementRef>;

    self = this;
    private alertControl = new AlertController();
    gesturesArray: Array<Gesture> = [];
    // gestureCtl: any;
    // private navigateParams = new NavParams();
    constructor(private router: Router, private gestureCtl: GestureController) {
        //this.gestureCtl = gestureCtl;
    }

    /**
     * View Children are hooked-up here to the actual page controls
     * @memberof RecursiveGroupsComponent
     */
    ngAfterViewInit(): void {
        // Always start ngAfterInit with no accidentally left-in gestures.
        this.gesturesArray.map(gesture => gesture.destroy());
        this.gesturesArray = new Array<Gesture>();

        // Look at the nodes in Console
        const x = this.dragNodes.toArray();
        console.log(x);


    }

    hookUpGestureControl(oneElement: ElementRef) {
        const drag = this.gestureCtl.create({
            el: oneElement.nativeElement,
            threshold: 1,
            gestureName: 'drag',
            onStart: ev => {
                oneElement.nativeElement.style.backgroundColor = 'pink';
                oneElement.nativeElement.style.opacity = '0.86';
                oneElement.nativeElement.style.fontWeight = 'bold';
                // this.contentScrollActive = false;
                // this.ChangeDetectorRef.detectChanges();
            },
            onMove: ev => {
                oneElement.nativeElement.style.transform = `translate(${ev.deltaX}ps, ${ev.deltaY}px)`;
                oneElement.nativeElement.style.zIndex = 10;
                this.checkDropzoneHover(ev.currentX, ev.currentY);
            },
            onEnd: ev => { },
        });
        drag.enable();
        this.gesturesArray.push(drag);
    }

    checkDropzoneHover(x, y) {
        // For every drop-zone
        const i = 1;
        const drop = this.dropNodes[i].nativeElement.getBoundingRect();


    }

    isInDropZone(x, y, zone) {
        return ((x >= zone.left && x <= zone.right)
            && (y >= zone.top || y <= zone.bottom)
        );
    }



    closeOpen(item: TreeItemEntry) {
        item.open = !item.open;
    }


    navigateToControl(item: TreeItemEntry) {
        const urlParams: NavigationExtras = { state: { ctrlId: item.key, catId: undefined, entity: item } };
        console.log(`Navigating to cat-control with ${item}`);
        console.log(`Item is packed as : ${urlParams}`);
        this.router.navigate(['cat-control'], urlParams);
    }



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


    async presentModifyPrompt(item: TreeItemEntry) {
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

import { Component, Input, IterableDiffers, OnChanges, SimpleChanges } from '@angular/core';
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
    @Input() children: TreeItemEntry;
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
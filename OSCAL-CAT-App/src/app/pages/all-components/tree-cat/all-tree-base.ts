import { Component, EventEmitter, Input, IterableDiffers, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RouterModule, Router, NavigationExtras, } from '@angular/router';
import { TreeItemEntry } from 'src/app/providers/app-state/app-tree/tree-elements';


@Component({
    selector: '[oscal-all-trees-base]',
    template:
        ` 
        <p>
            tree - ancestor - base works!
            It is an un- inheritable markup file
        </p>
        `,
    styleUrls: ['../action-all-common/tree-styles.scss'],
})
export class AllTreesBaseComponent {

    @Output() public canMoveForward: EventEmitter<any> = new EventEmitter();
    @Output() public saveTab: EventEmitter<any> = new EventEmitter();


    getNodeToolTip(item: TreeItemEntry): string {
        // const openCloseFlag = (!item.open && item.children);
        const openCloseVerb = (!item.open && item.children) ? 'Open ' : 'Close ';;
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

    getIconToolTip(item: TreeItemEntry): string {
        return '';
    }
}
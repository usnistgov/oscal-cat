import { AlertController } from '@ionic/angular';
import { Component, Input, SimpleChanges, OnChanges, OnInit } from '@angular/core';


import { CatalogService } from './../../../providers/oscal-data/catalog.service';
import { TreeItemEntry, TreeNodeType } from './../../../providers/app-state/app-tree/tree-elements';


@Component({
  selector: 'oscal-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss'],
})
/// ['./../tree-cat/tree-cat.component.scss']
export class ListGroupsComponent implements OnInit {
  @Input() controlsList: Array<TreeItemEntry>;
  @Input() theCat: CatalogService;

  alertControl: AlertController;
  includedControls: Array<TreeItemEntry>;
  cat: CatalogService;
  name = 'TreeView';
  groups: Array<any> = [{
    id: 'xxx',
    name: 'New Group',
  }
  ];

  constructor() {
    this.cat = this.theCat;
    this.alertControl = new AlertController();
  }


  ngOnInit() { }
  OnInit() { }

  public ngOnChanges(changes: SimpleChanges) {
  }

  getIncludedControls() {
    this.includedControls = this.includedControls || this.controlsList.filter(x => x.included);
    return this.includedControls;
  }

  /**
   * Presents Add Group Pop-Up
   */
  async presentAddGroup() {
    const summaryHtml = `<strong> Creating New Group<br /><br /></strong>`;

    const alert = await this.alertControl.create({
      header: `Create New Group Entry`,
      subHeader: `or Cancel`,
      // message: summaryHtml,
      cssClass: 'oscal-prompt-class',

      inputs: [
        {
          label: 'New Group Name',
          name: 'groupName',
          value: '',
          placeholder: 'Group Name Here',
          //type: 'textarea',
          //disabled: true,
        }, {
          label: 'Group ID',
          name: 'groupId',
          value: '',
          placeholder: 'Group ID Here',
        },
      ],
      buttons: [
        {
          text: 'Add Group',
          handler: (data: any) => { /* Transfer data here */
            console.log(`Save Information ${data.groupId}, ${data.groupName}`);
            return true;
          },
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: (data: any) => {
            return false;
          },
        },
      ]
    });
    await alert.present();
  }

  async presentRegroup(item: TreeItemEntry) {
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


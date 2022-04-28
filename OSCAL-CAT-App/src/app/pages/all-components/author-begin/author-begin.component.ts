import { Component, OnInit } from '@angular/core';
import { KnownOscalFilesService } from './../../../providers/oscal-files/known-files.service';
import { CurrentSessionData } from './../../../providers/app-state/state-nav-cat/state-session-data.service';
import { KnownOscalFileLocation } from 'src/app/interfaces/known-locations';
import { AlertController, ModalController } from '@ionic/angular';

const savedItems = 'savedWork';
@Component({
  selector: 'oscal-author-begin',
  templateUrl: './author-begin.component.html',
  styleUrls: ['./author-begin.component.scss'],
})
export class AuthorBeginComponent implements OnInit {

  savedWork: Array<string>;
  newDraft: boolean;
  oscalFiles: Array<KnownOscalFileLocation>;
  alertControl: AlertController;

  constructor(private session: CurrentSessionData, public modalController: ModalController) {
    this.oscalFiles = KnownOscalFilesService.getAllKnownFiles();
  }

  ngOnInit() {
    this.readSavedWork();
  }

  readSavedWork() {
    if (this.session.isKeyValue(savedItems)) {
      this.session.getKeyValueObject(savedItems).then(
        (value: Array<string>) => {
          if (value && Array.isArray(value) && value.length > 0) {
            this.savedWork = value;

          } else {
            this.savedWork = undefined;
            this.session.setKeyValueObject(savedItems, ['Work item 1', 'Work Item 1001']);
          }
        });
    }
  }

  popAlert(data: string, idx: number) {
    console.log(data);
    console.log(idx);
    data = data + idx;
    // alert(`Alert:\n\t${data}\n\tItem Number ${idx}`);
  }

  hasSavedWork(): boolean {
    return (!!this.savedWork);
  }

  removeWorkItem($event: Event, theItemIndex: number) {
    if (!!this.savedWork) {
      console.log(`Item Index ${theItemIndex} Event Target:${$event.target}`);
      this.savedWork.splice(theItemIndex, 1);
      if (this.savedWork.length > 0) {
        this.session.setKeyValueObject(savedItems, this.savedWork);
      } else {
        this.session.setKeyValueObject(savedItems, null);
        this.savedWork = null;
      }

    }
  }

  editWorkItemName($event, theItemIndex: number) {
  }

  /**
     * Function generates the pop-up
     * @param item : the Tree-Item-Entry to generate the popup for
     */
  // async presentPrompt(item:) {
  //   console.log(item);
  //   const isGroup: boolean = item.children ? true : false;
  //   const nodeType = item.nodeType.toString();
  //   const prefix: string = nodeType[0].toUpperCase() + nodeType.substr(1).toLowerCase();
  //   console.log(`nodeType:${nodeType} => Prefix = ${prefix}`);
  //   const summaryHtml: string = isGroup ? `<strong> ${prefix} ${item.key} Contains:<br /><br /> </strong>` +
  //     `&nbsp;&nbsp;Total of ${item.partsCount} Controls/Subgroups. <br /><br />` +
  //     `&nbsp;&nbsp;Control Short Names Span from ${item.children[0].key} to  ${item.children[item.partsCount - 1].key}.`
  //     :
  //     `<strong> ${prefix} ${item.key} </strong> ` +
  //     ` ${(item.partsCount > 0) ? 'Has ' : 'Has no'} ` +
  //     `${(item.partsCount > 0) ? item.partsCount.toString() : ''} Parameters.`;
  //   const alert = await this.alertControl.create({
  //     header: `${prefix} ${item.key} Info`,
  //     subHeader: `Full Name: ${item.label}:`,
  //     message: summaryHtml,
  //     cssClass: 'oscal-prompt-class',

  //     /*inputs: [
  //         {
  //             name: 'group',
  //             value: prefix + ': ' + item.label + '\n\t\t' + item.label + '\n\t\t' + item.label +
  //                 '\n\t\t' + item.label + '\n\t\t' + item.label,
  //             type: 'textarea',
  //             disabled: true,
  //         },
  //     ],*/
  //     buttons: [
  //       {
  //         text: 'Close',
  //         role: 'cancel',
  //         handler: data => {
  //           return false;
  //         }
  //       },
  //       {
  //         text: (item.nodeType === TreeNodeType.Control) ? 'Details...' : '',
  //         handler: data => {
  //           if (item.key) {
  //             // Follow to Details Page
  //           } else {
  //             // Same as Close
  //             return false;
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }



}

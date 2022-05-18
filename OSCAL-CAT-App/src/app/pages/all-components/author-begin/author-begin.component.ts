import { Component, OnDestroy, OnInit } from '@angular/core';
import { KnownOscalFilesService } from './../../../providers/oscal-files/known-files.service';
import { KnownOscalFileLocation } from 'src/app/interfaces/known-locations';
import { AlertController, ModalController } from '@ionic/angular';
import { v4 as UUIDv4 } from 'uuid';

import {
  CurrentSessionData, NamedSessionNodes, SessionData
} from './../../../providers/app-state/state-nav-cat/state-session-data.service';


@Component({
  selector: 'oscal-author-begin',
  templateUrl: './author-begin.component.html',
  styleUrls: ['./author-begin.component.scss'],
})
export class AuthorBeginComponent implements OnInit, OnDestroy {

  savedWork: Array<SessionData>;
  chosenSession: SessionData;
  oscalFiles: Array<KnownOscalFileLocation>;
  chosenOscalCat: KnownOscalFileLocation;
  newDraft: boolean;
  alertControl: AlertController;

  constructor(private session: CurrentSessionData, public modalController: ModalController) {
    this.oscalFiles = KnownOscalFilesService.getAllKnownFiles();
  }

  ngOnInit() {
    this.readSavedWork();
  }
  //

  readSavedWork() {
    if (this.session.isKeyValue(NamedSessionNodes.SAVED_SESSIONS)) {
      this.session.getKeyValueObject<Array<SessionData>>(NamedSessionNodes.SAVED_SESSIONS).then(
        (value: Array<SessionData>) => {
          if (value && Array.isArray(value) && value.length > 0) {
            this.savedWork = value;

          } else {
            this.savedWork = undefined;
            // [];
            const emptyWork: Array<SessionData> =
              [
                {
                  name: 'Work item 1',
                  uuid: UUIDv4(),
                },
                {
                  name: 'Work Item 1001',
                  uuid: UUIDv4(),
                }];
            this.session.setKeyValueObject<Array<SessionData>>(
              NamedSessionNodes.SAVED_SESSIONS, emptyWork);
          }
        });
    }
  }

  handleRadioChange($event: Event) {
    console.log($event);
    const value = ($event as CustomEvent).detail.value;
    console.log(value);
    const cats = ['', ''];
    if (value > 1) {
      this.chosenOscalCat = undefined;
      this.chosenSession = this.savedWork[value - 2];
    } else {
      this.chosenOscalCat = this.oscalFiles[value];
      this.chosenSession = undefined;
    }
    this.activateSession();
    this.readSavedWork();
  }

  popAlert(data: string, idx: number) {
    // console.log(data);
    // console.log(idx);
    // data = data + idx;
    // alert(`Alert:\n\t${data}\n\tItem Number ${idx}`);
  }

  hasSavedWork(): boolean {
    return (!!this.savedWork);
  }

  removeWorkItem($event: Event, theItemIndex: number) {
    // TODO: before killing existing work, it would be nice 
    // to verify that button press is not a mistake.

    if (!!this.savedWork) {
      console.log(`Item Index ${theItemIndex} Event Target:${$event.target}`);
      this.savedWork.splice(theItemIndex, 1);
      if (this.savedWork.length > 0) {
        this.session.setKeyValueObject(NamedSessionNodes.SAVED_SESSIONS, this.savedWork);
      } else {
        this.session.setKeyValueObject(NamedSessionNodes.SAVED_SESSIONS, null);
        this.savedWork = null;
      }

    }
  }

  editWorkItemName($event, theItemIndex: number) {
  }

  ionViewWillLeave(): void {
    // Does not work to hook up the 
    console.log('Begin-Page Will Leave!!!!!!');
    if (this.chosenOscalCat) {
      console.log(`Leaning with Cat`);
    } else if (this.chosenSession) {
      console.log(`Leaning with Session`);
    }
  }

  activateSession(addSessionToList: boolean = true) {
    console.log(`Cat-Activate-In`);
    console.log(this.chosenOscalCat);
    if (this.chosenOscalCat) {
      console.log(`Cat-Activate - Chosen-Cat`);
      const newSession: SessionData = {
        name: `Profile Draft Based on ${this.chosenOscalCat.cat_suffix}`,
        uuid: UUIDv4(),
      };
      console.log(newSession);
      if (addSessionToList) {
        if (!this.savedWork) {
          console.log(`Creating savedWork Array`);
          this.savedWork = new Array<SessionData>();
        }
        this.savedWork.push(newSession);
        console.log(`savedWork Array has Length:${this.savedWork.length}`);
        this.session.setKeyValueObject<Array<SessionData>>(NamedSessionNodes.SAVED_SESSIONS, this.savedWork);
        console.log(`Saved work Array ${this.savedWork}`);
        console.log(this.savedWork);
      }
      this.session.saveActiveSession(newSession);
    } else if (!this.chosenOscalCat && this.chosenSession) {
      this.session.saveActiveSession(this.chosenSession);
    }
  }

  ngOnDestroy(): void {
    console.log('Begin-Page Will Destroy!!!!!!');
    this.activateSession();
  }
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







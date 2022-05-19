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
  //alertControl: AlertController;

  constructor(private session: CurrentSessionData,
    public alertControl: AlertController) {
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
    this.activateSession(false);
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




  private removeWorkItem($event: Event, theItemIndex: number) {
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

  /**
  * Function generates the pop-up
  * @param item : the Tree-Item-Entry to generate the popup for
  */
  async presentDeleteWarning($event: Event, itemIndex: number) {
    const item = this.savedWork[itemIndex]
    const name = (item.fullName) ? item.fullName : item.name;
    const uuid = item.uuid;
    console.log(name);
    const summaryHtml: string =
      `<strong>Are you sure you want to delete</strong>`
      + `<strong>Saved Item: ${name}<br /> `
      + `With UUID: ${uuid} ?<br /><br /> </strong>`;
    const alert = await this.alertControl.create({
      header: `Delete Item?`,
      subHeader: `Do You Really Want to Delete Work?`,
      message: summaryHtml,
      cssClass: 'oscal-prompt-class',
      buttons: [
        {
          text: 'Delete',
          handler: data => {
            this.removeWorkItem($event, itemIndex);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            return false;
          }
        },
      ]
    });
    await alert.present();
  }


}









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
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { KnownOscalFilesService } from './../../../providers/oscal-files/known-files.service';
import { KnownOscalFileLocation } from 'src/app/interfaces/known-locations';
import { AlertController, ModalController } from '@ionic/angular';
import { v4 as UUIDv4 } from 'uuid';

import {
  CurrentSessionData, NamedSessionNodes, SessionData
} from './../../../providers/app-state/state-nav-cat/state-session-data.service';
import { OscalCatAuthorViewComponent } from '../action-commons/action-oscal-cat-author-view/action-oscal-cat-author-view.component';


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
  activeRadioCat: number;
  //alertControl: AlertController;
  @ViewChild('catDetails') catDetails: OscalCatAuthorViewComponent;

  constructor(
    private knownFiles: KnownOscalFilesService,
    private session: CurrentSessionData,
    public alertControl: AlertController) {

    this.oscalFiles = knownFiles.getAllKnownFiles();
  }

  ngOnInit() {
    // Pull up to UI the previously Saved Work-Items
    this.readSavedWork();
    this.readInSessionCats();
    this.activeRadioCat = -1;
  }

  handleCatRefresh(index: number) {
    const resArray = this.catDetails.formCommitArray();
    const entityChecks = resArray[0];
    const baselineChecks = resArray[1];
    const cat = this.knownFiles.getAllKnownFiles()[index];
    console.log(cat);
    if (cat && entityChecks[0]) {
      cat.needsRefresh = entityChecks[0];
    }
    if ((cat && cat.cat_baselines && baselineChecks.length > 0)) {
      const limit = Math.min(cat.cat_baselines.length, baselineChecks.length);
      for (let i = 0; i < limit; i++) {
        cat.cat_baselines[i].needsRefresh = baselineChecks[i];
        this.knownFiles.refreshCat(cat.cat_baselines[i]);
      }
    }
    this.knownFiles.refreshCat(cat);
    console.log(cat);
  }
  //

  readInSessionCats() {
    // Read the previously pulled-in Cats from Session
    this.session.getKeyValueObject<Array<SessionData>>(NamedSessionNodes.SAVED_SESSIONS)
      .then(
    )
  }

  readSavedWork() {
    if (this.session.isKeyValue(NamedSessionNodes.SAVED_SESSIONS)) {
      this.session.getKeyValueObject<Array<SessionData>>(NamedSessionNodes.SAVED_SESSIONS)
        .then( // Resolve Promise
          (value: Array<SessionData>) => {
            if (value && Array.isArray(value) && value.length > 0) {
              this.savedWork = value;

            } else {
              this.savedWork = Array<SessionData>();
            }

            /*        // Helps to save time when debugging session initialization   
                      else {
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
            */
          });
    }
  }

  handleRemoteLocalCacheRadio($event: Event) {
  }

  handleRadioChange($event: Event) {
    const value = ($event as CustomEvent).detail.value;
    const cats = ['', ''];
    // console.log($event);    
    // console.log(value);
    this.knownFiles.setActive(value);
    this.oscalFiles
    if (value > 1) {
      this.chosenOscalCat = undefined;
      this.chosenSession = this.savedWork[value - 2];
      this.activeRadioCat = -1;
    } else {
      this.chosenOscalCat = this.oscalFiles[value];
      this.chosenSession = undefined;
      this.activeRadioCat = value;
    }
    // this.activateSession(false);
    // this.readSavedWork();
  }


  showActiveCatInfo(idx: number): boolean {
    if (
      this.knownFiles.isCatInfoStale(
        this.knownFiles.getAllKnownFiles()[idx])
    ) {
      return idx == this.activeRadioCat;
    }
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

  parentIonViewWillLeave(): void {
    // Does not work to hook up the 
    console.log('!!!!!!======!!!!!! Begin-Page Will Leave!!!!!!');
    if (this.chosenOscalCat) {
      console.log(`Leaving with new Cat (new Session)`);
    } else if (this.chosenSession) {
      console.log(`Leaving with Existing Session`);
    }
    this.activateSession();
  }

  activateSession(addSessionToList = true) {
    console.log(this.chosenOscalCat);
    if (this.chosenOscalCat) {
      // Need to create a new persisted session
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
        console.log(`Saved work Array ${this.savedWork}`);
        console.log(this.savedWork);
        // TODO: Fix the below with better wrapper
        this.session.setKeyValueObject<Array<SessionData>>(NamedSessionNodes.SAVED_SESSIONS, this.savedWork)
      }
      this.session.ActiveSession = newSession;
    } else if (!this.chosenOscalCat && this.chosenSession) {
      // Session was already persisted
      this.session.ActiveSession = this.chosenSession;
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
  * Function generates the Alert pop-up
  */
  async presentDeleteWarning($event: Event, itemIndex: number) {
    const item = this.savedWork[itemIndex]
    const name = (item.fullName) ? item.fullName : item.name;
    const uuid = item.uuid;
    console.log(name);
    const summaryHtml: string =
      `<div>Are you sure you want to delete</div><br />`
      + `<div> <strong>Saved Work:</strong></div>`
      + `<div><strong>"${name}"<strong></div><br />`
      + `<div>With UUID:<div>`
      + ` <div><strong>[${uuid}]?</div></strong></div><br />`;
    const alert = await this.alertControl.create({
      header: `Delete Saved Work ?`,
      //subHeader: `Are You Sure?`,
      message: summaryHtml,
      cssClass: 'delete-alert-global-class',
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


  /// Rename work item Alert pop-up
  async presentEditName($event: Event, itemIndex: number) {
    const prompt = await this.alertControl.create({
      header: 'Rename Saved Work',
      message: "Enter new name for the saved item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


  hasBaseLines(fileInfo: KnownOscalFileLocation) {
    console.log(fileInfo.cat_baselines);
    return !!fileInfo.cat_baselines && fileInfo.cat_baselines.length > 0;
  }

}









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
import { KnownCatalogNames, KnownOscalFileLocation } from 'src/app/interfaces/known-locations';
import { AlertController, IonRadioGroup, ModalController } from '@ionic/angular';
import { v4 as UUIDv4 } from 'uuid';

import {
  CurrentSessionData, NamedSessionNodes, SessionBrief, SessionData
} from './../../../providers/app-state/state-nav-cat/state-session-data.service';
import { OscalCatAuthorViewComponent } from '../action-commons/action-oscal-cat-author-view/action-oscal-cat-author-view.component';


@Component({
  selector: 'oscal-author-begin',
  templateUrl: './author-begin.component.html',
  styleUrls: ['./author-begin.component.scss'],
})
export class AuthorBeginComponent implements OnInit, OnDestroy {

  savedWork: Array<SessionBrief>;
  savedWorkPromise: Promise<Array<SessionBrief>>;
  activeBrief: SessionBrief;
  activeBriefPromise: Promise<SessionBrief>;

  chosenBrief: SessionBrief;
  chosenSessionId: string;
  oscalFiles: Array<KnownOscalFileLocation>;
  chosenOscalCat: KnownOscalFileLocation;
  newDraft: boolean;
  activeRadioOscalCatForStaleness: number;
  activeIndex: number;
  activeItemString: string;
  //alertControl: AlertController;
  @ViewChild('catDetails') catDetails: OscalCatAuthorViewComponent;
  @ViewChild('mainRadioGroup') radioGroup: IonRadioGroup;

  constructor(
    private knownFiles: KnownOscalFilesService,
    private session: CurrentSessionData,
    public alertControl: AlertController) {

    this.oscalFiles = knownFiles.getAllKnownFiles();
    this.activeIndex = this.knownFiles.getActiveIndex();
    this.activeIndex = -1;
    this.readSavedBriefs();
    this.readActiveBrief();
  }

  ngOnInit() {
    // Pull up to UI the previously Saved Work-Items  
    this.readSavedBriefs();
    this.readActiveBrief();
  }

  /**
   * Handles refresh of the files by pulling them online again
   *
   * @param {number} index - T^he array index of the KnownFile to be refreshed
   * @memberof AuthorBeginComponent
   */
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

  /**
   *
   *
   * @returns {number}Sizes the known files array
   * @memberof AuthorBeginComponent
   */
  getCatListSize(): number {
    return this.oscalFiles.length;
  }

  markActiveBrief(): string {
    console.log('Mark-Active-Brief');
    if (!!this.activeBrief) {
      // if (this.activeBrief.index < this.getCatListSize()) {
      //   this.activeRadioCat = this.activeBrief.index;
      //   console.log(`AC-ORIG:${this.activeRadioCat}`);
      // } else {
      this.activeItemString = this.activeBrief.uuid;
      // (this.getIndexByUUID(this.activeBrief.uuid)
      //   + this.getCatListSize()).toString();
      console.log(`AC-UUID:${this.activeItemString}`);
      // }
    } else {
      this.activeItemString = '0';
    }
    console.log(this.activeItemString);
    this.radioGroup.value = this.activeItemString;
    return this.activeItemString;
  }

  getIndexByUUID(uuid: string): number {
    const index = this.savedWork.findIndex(
      (x: SessionBrief) => {
        return x.uuid === uuid;
      });
    return index;
  }

  readSavedBriefs() {
    // Read the previously pulled-in Cats from Session
    if (!!CurrentSessionData.savedBriefs) {
      this.savedWork = CurrentSessionData.savedBriefs;
    } else {
      if (this.session.isKeyValuePresent(
        NamedSessionNodes.SESSION_BRIEFS)
      ) {
        this.savedWorkPromise = this.session
          .getKeyValueObject<Array<SessionBrief>>(NamedSessionNodes.SESSION_BRIEFS);
        this.savedWorkPromise.then(
          (savedValue: Array<SessionBrief>) => {
            if (savedValue && Array.isArray(savedValue) && savedValue.length > 0) {
              this.savedWork = savedValue;
            } else {
              this.savedWork = Array<SessionBrief>();
            }
            console.log(`Saved Work:`)
            console.log(this.savedWork);
          });
      }
    }
  }

  readActiveBrief() {
    // Read the persisted Active-Brief
    if (this.session.isKeyValuePresent(
      NamedSessionNodes.ACTIVE_BRIEF)
    ) {
      this.activeBriefPromise = this.session
        .getKeyValueObject<SessionBrief>(NamedSessionNodes.ACTIVE_BRIEF);
      this.activeBriefPromise.then(
        (savedValue: SessionBrief) => {
          if (savedValue) {
            this.activeBrief = savedValue;
            this.radioGroup.value = this.markActiveBrief();
          } else {
            this.activeBrief = undefined;
          }
          console.log(`Active Brief:`)
          console.log(this.activeBrief);
        });
    }
  }

  handleRemoteLocalCacheRadio($event: Event) {
    // THis is for User-Added files
  }

  handleRadioChange($event: Event) {
    const value = ($event as CustomEvent).detail.value;
    // console.log($event);
    // console.log(value);
    // console.log(`value < this.getCatListSize() : ${value < this.getCatListSize()}`);

    if (value < this.getCatListSize()) {
      this.knownFiles.setActive(value);
      this.chosenOscalCat = this.oscalFiles[value];
      this.chosenBrief = undefined;
      this.activeRadioOscalCatForStaleness = value;
    } else {
      this.chosenOscalCat = undefined;
      this.chosenBrief = this.savedWork[this.getIndexByUUID(value)];
      this.activeItemString = value;
    }
  }


  showActiveCatInfo(idx: number): boolean {
    if (
      this.knownFiles.isCatInfoStale(
        this.knownFiles.getAllKnownFiles()[idx])
    ) {
      return idx == this.activeRadioOscalCatForStaleness;
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

  //This is a routed page hook on PageWillLeave Event
  parentIonViewWillLeave(): void {
    this.activateSession();
  }

  createNewBrief(newSessionUUID: string): SessionBrief {
    const newBrief = new SessionBrief(
      newSessionUUID,
      `Profile Draft Based on ${this.chosenOscalCat.cat_suffix}`,
      this.activeIndex
    );
    newBrief.catType = this.chosenOscalCat.cat_enum;

    console.log(`New-Brief`);
    console.log(newBrief);
    return newBrief;
  }

  createNewSession(newBrief: SessionBrief): SessionData {
    const newSession = new SessionData(
      newBrief.uuid,
      newBrief.name,
      newBrief.originalIndexKF,
    );
    newSession.catType = this.chosenOscalCat.cat_enum;
    newSession.knownCat = this.chosenOscalCat;
    newSession.catalog = this.chosenOscalCat.content_cat.loadedEntity;

    console.log(`New-Session`);
    console.log(newSession);
    return newSession;
  }

  activateSession(addSessionToList = true) {
    console.log(`ChosenOscalCat & ChosenBrief`);
    console.log(this.chosenOscalCat);
    console.log(this.chosenBrief);
    if (this.chosenOscalCat) {
      // User chose BASE CATALOG. We need to :
      // 1. Update session Briefs (Used Only in UI Here so far)
      // 2. Change the ActiveBrief to the new One [Persist It as Well!]
      // 3. Create a new persisted session with UUID (Will be used as an Active-Session persisted Entity)
      const newSessionUUID = UUIDv4()
      console.log(`Cat-Activate - Chosen-Cat - Creating UUID`);
      console.log(newSessionUUID)

      const newBrief = this.createNewBrief(newSessionUUID);
      const newSession = this.createNewSession(newBrief);

      // TODO: Add list scanning of the briefs to see if session already exists
      if (addSessionToList) {

        if (!this.savedWork) {
          // console.log(`Creating new savedWork Array`);
          this.savedWork = new Array<SessionBrief>();
        }
        this.savedWork.push(newBrief);

        console.log(`savedWork Array has Length:${this.savedWork.length}`);
        console.log(`Saved work Array ${this.savedWork}`);
        console.log(this.savedWork);

        this.persistSavedBriefs(newBrief); // 1. Update session Briefs... & 2. Change the ActiveBrief ...
        this.activeItemString = newBrief.uuid; // Reflect in UI the Newly-Created ActiveBrief
        this.session.createNewActiveSession(newBrief);
      }
    } else if (!this.chosenOscalCat && this.chosenBrief) {
      // In the case of the chosen Brief-Work-Item need to :
      // 1. Change the ActiveBrief in Session (Activate Brief) to the Chosen-One 
      // 2. Persist ActiveBrief in Storage as Well!
      //    ** Session-Briefs-Array does not change (Only Selection does)
      // 3. Read and Assign the ActiveSession form UUID-*SessionData* field
      console.log(`Chosen-ActiveSession`);
      console.log(this.session.ActiveSession);
      this.session.activateBrief(this.chosenBrief);
      this.session.activateSession(this.chosenBrief);
    }
  }



  private persistSavedBriefs(newBrief: SessionBrief) {
    this.session.setKeyValueObject<Array<SessionBrief>>(
      NamedSessionNodes.SESSION_BRIEFS,
      this.savedWork
    )
      .then(
        x => {
          console.log(`this.session.ActiveSession`);
          if (this.session.ActiveBrief !== newBrief) {
            this.session.activateBrief(newBrief);
          }
          console.log(this.session.ActiveBrief);
        }
      ).catch(
        (e) => {
          this.genericPromiseCatch(e);
        });
  }

  genericPromiseCatch(e, extraInfo: string = undefined) {
    if (extraInfo) {
      console.log(`${extraInfo}`);
    } else {
      console.log(`Error`);
    }
    console.log(e);
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
        this.session.setKeyValueObject(NamedSessionNodes.SESSION_BRIEFS, this.savedWork)
          .then(
            (newData) => {
              this.savedWork = newData;
              this.readSavedBriefs();
              this.readActiveBrief();
            }
          ).catch(
            (error) => {
              console.log(error);
            }
          );
      } else {
        this.session.setKeyValueObject(NamedSessionNodes.SESSION_BRIEFS, null);
        this.savedWork = null;
      }
    }
  }

  /**
  * Function generates the Alert pop-up
  */
  async presentDeleteWarning($event: Event, itemIndex: number) {
    console.log(itemIndex);
    console.log(this.savedWork);

    console.log(this.savedWork[itemIndex]);
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

  getDraftsTitle(): string {
    if (this.savedWork && this.savedWork.length > 0) {
      return `Continue with the Previously Saved Work`;
    } else {
      return '';
    }
  }

}









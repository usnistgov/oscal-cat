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
import { CatTheBaseComponent } from '../action-all-common/cat-the-base/cat-the-base.component';


@Component({
  selector: 'oscal-author-begin',
  templateUrl: './author-begin.component.html',
  styleUrls: ['./author-begin.component.scss'],
})
export class AuthorBeginComponent extends CatTheBaseComponent implements OnInit, OnDestroy {

  savedWork: Array<SessionBrief>;
  savedWorkPromise: Promise<Array<SessionBrief>>;
  activeBrief: SessionBrief;
  activeBriefPromise: Promise<SessionBrief>;

  chosenBrief: SessionBrief;
  chosenSessionId: string;
  chosenOscalCat: KnownOscalFileLocation;
  newDraft: boolean;
  activeRadioOscalCatForStaleness: number;
  activeItemString: string;


  //alertControl: AlertController;
  @ViewChild('catDetails') catDetails: OscalCatAuthorViewComponent;
  @ViewChild('mainRadioGroup') radioGroup: IonRadioGroup;

  constructor(
    public rootKnownFiles: KnownOscalFilesService,
    public rootSessionService: CurrentSessionData,
    public rootAlertControl: AlertController) {

    super(rootKnownFiles, rootSessionService, rootAlertControl);
  }

  ngOnInit() {
    // console.log(`!!!!!! ng-Init !!!!!!`);
    // Pull up to UI the previously Saved Work-Items  
    // this.radioGroup.value = this.markActiveBrief();

    // this.readSavedBriefs();
    // this.readAndSetActiveBrief();
    this.initLists();
  }

  initLists() {
    this.readSavedBriefs();
    this.readAndSetActiveBrief();
  }

  /**
   * Handles refresh of the files by pulling them online again
   * @param {number} index - The array index of the KnownFile to be refreshed
   * @memberof AuthorBeginComponent
   */
  handleCatRefresh(index: number) {
    const resArray = this.catDetails.formCommitArray();
    const entityChecks = resArray[0];
    const baselineChecks = resArray[1];
    const cat = this.rootKnownFiles.getAllKnownFiles()[index];
    // console.log(cat);
    if (cat && entityChecks[0]) {
      cat.needsRefresh = entityChecks[0];
    }
    if ((cat && cat.cat_baselines && baselineChecks.length > 0)) {
      const limit = Math.min(cat.cat_baselines.length, baselineChecks.length);
      for (let i = 0; i < limit; i++) {
        cat.cat_baselines[i].needsRefresh = baselineChecks[i];
        this.rootKnownFiles.refreshCat(cat.cat_baselines[i]);
      }
    }
    this.rootKnownFiles.refreshCat(cat);
    // console.log(cat);
  }

  /**
   * Size up the this.oscalFiles array
   * @returns {number}Sizes the known files array
   * @memberof AuthorBeginComponent
   */
  getCatListSize(): number {
    return this.oscalFiles.length;
  }

  /**
   * Mark the radio of the active catalog
   * @returns {string}
   * @memberof AuthorBeginComponent
   */
  markActiveBrief(): string {
    // console.log('Mark-Active-Brief');
    if (!!this.activeBrief) {
      // if (this.activeBrief.index < this.getCatListSize()) {
      //   this.activeRadioCat = this.activeBrief.index;
      //   console.log(`AC-ORIG:${this.activeRadioCat}`);
      // } else {
      this.activeItemString = this.activeBrief.uuid;
      if (!(this.activeItemString < this.getCatListSize().toString())) {
        this.chosenBrief = this.activeBrief
      }
      // (this.getIndexByUUID(this.activeBrief.uuid)
      //   + this.getCatListSize()).toString();
      // console.log(`AC-UUID:${this.activeItemString}`);
      // }
    } else {
      this.activeItemString = '0';
    }
    // console.log(this.activeItemString);
    this.radioGroup.value = this.activeItemString;
    return this.activeItemString;
  }

  /**
   * Identify index of the previously saved work by UUID
   * @param {string} uuid
   * @returns {number}
   * @memberof AuthorBeginComponent
   */
  getIndexByUUID(uuid: string): number {
    const index = this.savedWork.findIndex(
      (x: SessionBrief) => {
        return x.uuid === uuid;
      });
    return index;
  }

  /**
   * Read briefs from 'OC:All-Briefs' (NamedSessionNodes.SESSION_BRIEFS) for the UI & Session
   * @memberof AuthorBeginComponent
   */
  readSavedBriefs() {
    // Read the previously pulled-in Cats from Session
    if (!!CurrentSessionData.savedBriefs) {
      this.savedWork = CurrentSessionData.savedBriefs;
    } else {
      if (this.rootSessionService.isKeyValuePresent(
        NamedSessionNodes.SESSION_BRIEFS)
      ) {
        this.savedWorkPromise = this.rootSessionService
          .getKeyValueObject<Array<SessionBrief>>(NamedSessionNodes.SESSION_BRIEFS);
        this.savedWorkPromise.then(
          (savedValue: Array<SessionBrief>) => {
            if (savedValue && Array.isArray(savedValue) && savedValue.length > 0) {
              this.savedWork = savedValue;
            } else {
              this.savedWork = Array<SessionBrief>();
            }
            // console.log(`Saved Work:`)
            // console.log(this.savedWork);
          });
      }
    }
  }

  /**
   * Read briefs from 'OC:Active-Briefs' (NamedSessionNodes.ACTIVE_BRIEF) for the UI & Session
   * @memberof AuthorBeginComponent
   */
  readAndSetActiveBrief() {
    // Read the persisted Active-Brief
    if (this.appSessionService.isKeyValuePresent(
      NamedSessionNodes.ACTIVE_BRIEF)
    ) {
      this.activeBriefPromise = this.appSessionService
        .getKeyValueObject<SessionBrief>(NamedSessionNodes.ACTIVE_BRIEF);
      this.activeBriefPromise.then(
        (savedValue: SessionBrief) => {
          if (savedValue) {
            this.activeBrief = savedValue;
            this.radioGroup.value = this.markActiveBrief();
          } else {
            this.activeBrief = undefined;
          }
          // console.log(`Active Brief:`)
          // console.log(this.activeBrief);
        });
    }
    // console.log(`Active Brief:`)
    // console.log(this.activeBrief);
  }

  /**
   * Radio change handle function
   * @param {Event} $event
   * @memberof AuthorBeginComponent
   */
  handleRadioChange($event: Event) {
    const value = ($event as CustomEvent).detail.value;
    console.log($event);
    console.log(value);
    console.log(`value < this.getCatListSize() : ${value < this.getCatListSize()}`);
    if (value < this.getCatListSize()) {
      // Known files new template
      this.activeIndex = value;
      this.rootKnownFiles.setActive(value);
      this.chosenOscalCat = this.oscalFiles[value];
      this.chosenBrief = undefined;
      this.activeRadioOscalCatForStaleness = value;
      this.chosenBrief = this.createNewBrief();
      this.rootSessionService.activateBrief(this.chosenBrief);
      this.rootSessionService.activateSession(this.chosenBrief);

    } else {
      // Selected existing savedWork item
      this.chosenBrief = this.savedWork[this.getIndexByUUID(value)];
      // console.log('BEGIN: Activating brief');
      // console.log(this.chosenBrief);
      if (!!this.chosenBrief) {
        // Write down the selection!!!
        this.rootSessionService.activateBrief(this.chosenBrief);
        this.rootSessionService.activateSession(this.chosenBrief);
        // console.log('END: Activating brief');
      }
      if (!!this.chosenBrief
        && !!this.chosenBrief.originalIndexKF
        && this.chosenBrief.originalIndexKF >= 0) {
        // Record the Known Files Index if available
        this.chosenOscalCat = this.oscalFiles[this.chosenBrief.originalIndexKF];
      } else {
        this.chosenOscalCat = undefined
      }
      this.activeItemString = value;
    }
  }

  /**
   * Verify if the downloaded files became stale
   * @param {number} idx
   * @returns {boolean}
   * @memberof AuthorBeginComponent
   */
  showActiveCatInfo(idx: number): boolean {
    if (
      this.rootKnownFiles.isCatInfoStale(this.rootKnownFiles.getAllKnownFiles()[idx])
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

  /**
   * True if saved work exists
   *
   * @returns {boolean}
   * @memberof AuthorBeginComponent
   */
  hasSavedWork(): boolean {
    return (!!this.savedWork);
  }

  /**
   * Plug in editing pop-up for the Saved Items names
   * @param {*} $event
   * @param {number} theItemIndex
   * @memberof AuthorBeginComponent
   */
  editWorkItemName($event, theItemIndex: number) {
  }

  /**
   * 
   * This is a routed page hook on PageWillLeave Event
   * @memberof AuthorBeginComponent
   */
  parentIonViewWillLeave(): void {
    this.activateSession();
  }

  /**
   * Creates a brief object for the session-preserved object
   * @param {string} newSessionUUID
   * @returns {SessionBrief} new Session brief returned
   * @memberof AuthorBeginComponent
   */
  createNewBrief(): SessionBrief {
    const newSessionUUID = UUIDv4();
    const newBrief = new SessionBrief(
      newSessionUUID,
      `Profile Draft Based on ${this.chosenOscalCat.cat_suffix}`,
      this.activeIndex
    );
    newBrief.catType = this.chosenOscalCat.cat_enum;
    // Debug-information for console debugging
    // console.log(`New-Brief`);
    // console.log(newBrief);
    return newBrief;
  }

  /**
   * Create a new session object {UUID}:Session-Data
   * @param {SessionBrief} newBrief
   * @returns {SessionData}
   * @memberof AuthorBeginComponent
   */
  createNewSession(newBrief: SessionBrief): SessionData {
    const newSession = new SessionData(
      newBrief.uuid,
      newBrief.name,
      newBrief.originalIndexKF,
    );
    newSession.catType = this.chosenOscalCat.cat_enum;
    newSession.knownCat = this.chosenOscalCat;
    newSession.catalog = this.chosenOscalCat.content_cat.loadedEntity;

    // console.log(`New-Session`);
    // console.log(newSession);
    return newSession;
  }

  /**
   * Activation of the session 
   * @param {boolean} [addSessionToList=true]
   * @memberof AuthorBeginComponent
   */
  activateSession(addSessionToList = true) {
    // console.log(`ChosenOscalCat & ChosenBrief`);
    // console.log(this.chosenOscalCat);
    // console.log(this.chosenBrief);

    if (this.chosenOscalCat && this.chosenBrief) {
      // User chose BASE CATALOG. We need to :
      // 1. Update session Briefs (Used Only in UI Here so far)
      // 2. Change the ActiveBrief to the new One [Persist It as Well!]
      // 3. Create a new persisted session with UUID (Will be used as an Active-Session persisted Entity)
      // console.log(`Cat-Activate - Chosen-Cat - Creating UUID`);
      // console.log(newSessionUUID)

      // const newBrief = this.createNewBrief();
      const newBrief = this.chosenBrief;
      const newSession = this.createNewSession(this.chosenBrief);
      const newSessionUUID = this.chosenBrief.uuid;

      // TODO: Add list scanning of the briefs to see if session already exists
      if (addSessionToList) {

        if (!this.savedWork) {
          // console.log(`Creating new savedWork Array`);
          this.savedWork = new Array<SessionBrief>();
        }
        if (!(this.savedWork.indexOf(newBrief) >= 0)) {
          this.savedWork.push(newBrief);
        }

        // console.log(`savedWork Array has Length:${this.savedWork.length}`);
        // console.log(`Saved work Array ${this.savedWork}`);
        // console.log(this.savedWork);

        this.persistSavedBriefs(newBrief); // 1. Update session Briefs... & 2. Change the ActiveBrief ...
        this.activeItemString = newSessionUUID; // Reflect in UI the Newly-Created ActiveBrief
        const theCat = this.getCatalog(newBrief);
        this.rootSessionService.createNewActiveSession(newBrief, theCat);
        this.chosenOscalCat = undefined;
      }
    } else if (!this.chosenOscalCat && this.chosenBrief) {
      // In the case of the chosen Brief-Work-Item need to :
      // 1. Change the ActiveBrief in Session (Activate Brief) to the Chosen-One 
      // 2. Persist ActiveBrief in Storage as Well!
      //    ** Session-Briefs-Array does not change (Only Selection does)
      // 3. Read and Assign the ActiveSession form UUID-*SessionData* field
      // console.log(`Chosen-ActiveSession`);
      // console.log(this.session.ActiveSession);
      this.rootSessionService.activateBrief(this.chosenBrief);
      this.rootSessionService.activateSession(this.chosenBrief);
    }
  }

  /**
   * Get catalog form the KnownFiles by brief 
   * @private
   * @param {SessionBrief} brief
   * @returns
   * @memberof AuthorBeginComponent
   */
  private getCatalog(brief: SessionBrief) {
    if (this.oscalFiles) {
      if (brief.originalIndexKF < this.oscalFiles.length) {
        if (!!this.oscalFiles
          && !!this.oscalFiles[brief.originalIndexKF]
          && !!this.oscalFiles[brief.originalIndexKF].content_cat
          && !!this.oscalFiles[brief.originalIndexKF].content_cat.loadedEntity
        )
          return this.oscalFiles[brief.originalIndexKF].content_cat.loadedEntity;
      }
      return undefined;
    }
  }

  /**
   * Save modified briefs into the in-browser indexedDB
   * @private
   * @param {SessionBrief} newBrief
   * @memberof AuthorBeginComponent
   */
  private persistSavedBriefs(newBrief: SessionBrief) {
    this.rootSessionService.setKeyValueObject<Array<SessionBrief>>(
      NamedSessionNodes.SESSION_BRIEFS,
      this.savedWork
    )
      .then(
        x => {
          // console.log(`this.session.ActiveSession`);
          if (this.rootSessionService.getActiveBrief() !== newBrief) {
            this.rootSessionService.activateBrief(newBrief);
            this.initLists();
          }
          // console.log(this.session.ActiveBrief);
        }
      ).catch(
        (e) => {
          this.genericPromiseCatch(e, 'Catch-Error in persistSavedBriefs');
        });
  }


  /**
   * Handles caught generic promise errors
   *
   * @param {*} e - the caught error
   * @param {string} [extraInfo=undefined] - the error message for the context
   * @memberof AuthorBeginComponent
   */
  genericPromiseCatch(e, extraInfo: string = undefined) {
    if (extraInfo) {
      console.log(`${extraInfo}`);
    } else {
      console.log(`Error`);
    }
    console.log(e);
  }

  ngOnDestroy(): void {
    // console.log('Begin-Page Will Destroy!!!!!!');
    this.activateSession();
    this.initLists();
  }

  private removeWorkItem($event: Event, theItemIndex: number) {
    // TODO: before killing existing work, it would be nice 
    // for user to verify that button press is not a mistake.

    if (!!this.savedWork) {
      // console.log(`Item Index ${theItemIndex} Event Target:${$event.target}`);
      const item = this.savedWork[theItemIndex]
      this.savedWork.splice(theItemIndex, 1);
      // **********************************************
      // Delete the HEAVY-WEIGHT session object by UUID
      // console.log('Deleting UUID Session');
      // console.log(item.uuid);
      this.rootSessionService.removeSession(item.uuid);
      // **********************************************
      this.updateSavedItems();
    }
  }

  private updateSavedItems() {
    if (this.savedWork.length > 0) {
      this.rootSessionService.setKeyValueObject(NamedSessionNodes.SESSION_BRIEFS, this.savedWork)
        .then(
          (newData) => {
            this.savedWork = newData;
            this.readSavedBriefs();
            this.readActiveBrief();
          }
        ).catch(
          (error) => {
            this.genericPromiseCatch(error, 'Catch-Error in removeWorkItem');
          }
        );
    } else {
      this.rootSessionService.removeItemByKey(NamedSessionNodes.SESSION_BRIEFS);
      this.rootSessionService.removeItemByKey(NamedSessionNodes.ACTIVE_BRIEF);
      this.savedWork = null;
    }
  }

  /**
   * Present delete Alert pop-up warning with Yes-Delete/Cancel and hook-up lambda-events  
   * @param {Event} $event
   * @param {number} itemIndex
   * @memberof AuthorBeginComponent
   */
  async presentDeleteWarning($event: Event, itemIndex: number) {
    // console.log(itemIndex);
    // console.log(this.savedWork);
    // console.log(this.savedWork[itemIndex]);
    const item = this.savedWork[itemIndex]
    const name = (item.fullName) ? item.fullName : item.name;
    const uuid = item.uuid;
    // console.log(name);
    const summaryHtml: string =
      `<div>Are you sure you want to delete</div><br />`
      + `<div> <strong>Saved Work:</strong></div>`
      + `<div><strong>"${name}"<strong></div><br />`
      + `<div>With UUID:<div>`
      + ` <div><strong>[${uuid}]?</div></strong></div><br />`;
    const alert = await this.rootAlertControl.create({
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

  /**
   * Rename work item Alert pop-up
   * @param {Event} $event
   * @param {number} itemIndex
   * @memberof AuthorBeginComponent
   */
  async presentEditName($event: Event, itemIndex: number) {
    const item = this.savedWork[itemIndex]
    const name = (item.fullName) ? item.fullName : item.name;
    const uuid = item.uuid;
    const prompt = await this.rootAlertControl.create({
      cssClass: 'prompt-global-class',
      header: `Rename ${name}`,
      message: `Enter new name for the saved item<br/> ${uuid}`,
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: name,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            // console.log('Saved clicked');
            // console.log(data);
            this.savedWork[itemIndex].name = data.title;
            this.updateSavedItems()

          }
        }
      ]
    });
    prompt.present();
  }

  /**
   * Returns true if cat baselines are present
   * @param {KnownOscalFileLocation} fileInfo
   * @returns
   * @memberof AuthorBeginComponent
   */
  hasBaseLines(fileInfo: KnownOscalFileLocation) {
    // console.log(fileInfo.cat_baselines);
    return !!fileInfo.cat_baselines && fileInfo.cat_baselines.length > 0;
  }

  /**
   * Returns the List Title for SavedItems
   * @returns {string}
   * @memberof AuthorBeginComponent
   */
  getDraftsTitle(): string {
    if (this.savedWork && this.savedWork.length > 0) {
      return `Continue with the Previously Saved Work`;
    } else {
      return '';
    }
  }

  hasBaseLines(fileInfo: KnownOscalFileLocation) {
    // console.log(fileInfo.cat_baselines);
    return !!fileInfo.cat_baselines && fileInfo.cat_baselines.length > 0;
  }

  /**
   * Returns the List Title for SavedItems
   * @returns {string}
   * @memberof AuthorBeginComponent
   */
  getDraftsTitle(): string {
    if (this.savedWork && this.savedWork.length > 0) {
      return `Continue with the Previously Saved Work`;
    } else {
      return '';
    }
  }

}









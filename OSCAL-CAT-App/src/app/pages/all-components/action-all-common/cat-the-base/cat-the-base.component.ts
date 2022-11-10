import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { KnownOscalFileLocation } from 'src/app/interfaces/known-locations';
import { CurrentSessionData, NamedSessionNodes, SessionBrief, SessionData } from 'src/app/providers/app-state/state-nav-cat/state-session-data.service';
import { KnownOscalFilesService } from 'src/app/providers/oscal-files/known-files.service';

@Component({
  selector: 'app-cat-the-base',
  templateUrl: './cat-the-base.component.html',
  styleUrls: ['./cat-the-base.component.css']
})
export class CatTheBaseComponent implements OnInit {

  savedWorkPromise: Promise<Array<SessionBrief>>;
  savedWork: Array<SessionBrief>;

  activeBriefPromise: Promise<SessionBrief>;
  activeBrief: SessionBrief;

  activeSessionPromise: Promise<SessionData>;
  activeSession: SessionData;

  appSessionService: CurrentSessionData;

  oscalFiles: Array<KnownOscalFileLocation>;
  activeIndex: number;

  constructor(
    public rootKnownFiles: KnownOscalFilesService,
    public rootSessionService: CurrentSessionData,
    public rootAlertControl: AlertController) {


    this.appSessionService = rootSessionService;
    this.oscalFiles = rootKnownFiles.getAllKnownFiles();

    this.activeIndex = this.rootKnownFiles.getActiveIndex();
    this.activeIndex = -1;

    this.readSavedBriefs();
    this.readActiveBrief();
  }

  ngOnInit() {
    this.readSavedBriefs();
    this.readActiveBrief();
  }

  /**
   * Read briefs from 'OC:Active-Briefs' (NamedSessionNodes.ACTIVE_BRIEF) for the UI & Session
   * @memberof AuthorBeginComponent
   */
  readActiveBrief() {
    const isInBrief = true;
    // Read the persisted Active-Brief
    // console.log(`Reading Active Brief:`)
    if (this.appSessionService.isKeyValuePresent(
      NamedSessionNodes.ACTIVE_BRIEF)
    ) {
      this.activeBriefPromise = this.appSessionService
        .getKeyValueObject<SessionBrief>(NamedSessionNodes.ACTIVE_BRIEF);

      this.activeBriefPromise.then(
        (savedValue: SessionBrief) => {
          if (savedValue) {
            this.activeBrief = savedValue;
            this.readCurrentSession(isInBrief);
            // this.radioGroup.value = this.markActiveBrief();
          } else {
            this.activeBrief = undefined;
            console.log(`!!! Invalidated  Brief !!!`)
          }
          console.log(`Active Brief:`)
          console.log(this.activeBrief);
          if (this.activeBrief) {
            console.log(this.activeBrief.uuid);
          }
        });
    }
  }

  readCurrentSession(isFromBrief: boolean = false) {
    // First make sure that active brief is read
    if ((!this.activeBrief && !this.activeBriefPromise) && !isFromBrief) {
      this.readActiveBrief();
    }
    const id = this.activeBrief.sessionDataName;
    this.activeSession = this.appSessionService.getActiveSession();
    if (!!this.activeSession) {

    }
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
  readActiveBriefAuthoring() {
    // Read the persisted Active-Brief
    if (this.rootSessionService.isKeyValuePresent(
      NamedSessionNodes.ACTIVE_BRIEF)
    ) {
      this.activeBriefPromise = this.rootSessionService
        .getKeyValueObject<SessionBrief>(NamedSessionNodes.ACTIVE_BRIEF);
      this.activeBriefPromise.then(
        (savedValue: SessionBrief) => {
          if (savedValue) {
            this.activeBrief = savedValue;
            // this.radioGroup.value = this.markActiveBrief();
          } else {
            this.activeBrief = undefined;
          }
          // console.log(`Active Brief:`)
          // console.log(this.activeBrief);
        });
    }
  }


}

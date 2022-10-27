import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CurrentSessionData, NamedSessionNodes, SessionBrief } from 'src/app/providers/app-state/state-nav-cat/state-session-data.service';
import { KnownOscalFilesService } from 'src/app/providers/oscal-files/known-files.service';

@Component({
  selector: 'app-cat-the-base',
  templateUrl: './cat-the-base.component.html',
  styleUrls: ['./cat-the-base.component.css']
})
export class CatTheBaseComponent implements OnInit {

  activeBriefPromise: Promise<SessionBrief>;
  activeBrief: SessionBrief;

  constructor(
    private knownFiles: KnownOscalFilesService,
    private session: CurrentSessionData,
    public alertControl: AlertController) {

  }

  ngOnInit() {

  }

  /**
 * Read briefs from 'OC:Active-Briefs' (NamedSessionNodes.ACTIVE_BRIEF) for the UI & Session
 * @memberof AuthorBeginComponent
 */
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

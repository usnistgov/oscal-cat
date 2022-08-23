import { Component, Input, OnInit } from '@angular/core';
import { KnobName } from '@ionic/core';
import { KnownOscalFileLocation } from 'src/app/interfaces/known-locations';

@Component({
  selector: 'oscal-cat-author-view',
  templateUrl: './action-oscal-cat-author-view.component.html',
  styleUrls: ['./action-oscal-cat-author-view.component.css']
})
export class OscalCatAuthorViewComponent implements OnInit {

  @Input() showInfo: boolean;
  @Input() knownCat: KnownOscalFileLocation;

  private entityChecks: Array<boolean> = [false, false];
  private baselineChecks: Array<boolean> = [false, false, false, false];

  constructor() {
    // this.entityChecks = [false, false];
    // this.baselineChecks = [false, false, false, false];
  }

  ngOnInit() {


  }

  showBaselines() {
    return !!this.knownCat && !!this.knownCat.cat_baselines && this.knownCat.cat_baselines.length > 0 && this.entityChecks[1];
  }

  onCheckEntityUpdate($event: CustomEvent, id: number = -1) {
    if (id < 2 && id >= 0) {
      this.entityChecks[id] = $event.detail.checked; //!this.entityChecks[id];
    }
    console.log(`EB-Id: ${id}; Checked:${$event.detail.checked}`);
    console.log($event);
    console.log(this.entityChecks);

    $event.stopPropagation();
  }

  onCheckBaselineUpdate($event: CustomEvent, id: number = -1) {
    if (id < this.baselineChecks.length && id >= 0) {
      this.baselineChecks[id] = $event.detail.checked;
    }
    console.log(`BL-Id: ${id};  Checked:${$event.detail.checked}`);
    console.log($event);
    console.log(this.baselineChecks);

    $event.stopPropagation();
  }

}

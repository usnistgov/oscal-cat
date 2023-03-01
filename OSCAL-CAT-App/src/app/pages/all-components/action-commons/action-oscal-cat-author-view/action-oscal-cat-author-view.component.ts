import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxChangeEventDetail } from '@ionic/angular';
import { KnobName } from '@ionic/core';
import { KnownOscalFileLocation } from 'src/app/interfaces/known-locations';
import { KnownOscalFilesService } from 'src/app/providers/oscal-files/known-files.service';
import { IMustCommitFormDataArray } from '../action-ancestor-base/action-ancestor-base.component';

@Component({
  selector: 'oscal-cat-author-view',
  templateUrl: './action-oscal-cat-author-view.component.html',
  styleUrls: ['./action-oscal-cat-author-view.component.css']
})
export class OscalCatAuthorViewComponent implements OnInit, IMustCommitFormDataArray<Array<boolean>> {

  @Input() index: number;
  @Input() showInfo: boolean;
  @Input() knownCat: KnownOscalFileLocation;
  @Output() refreshCats: EventEmitter<any> = new EventEmitter(); //() => void;

  knownFiles: KnownOscalFilesService

  entityChecks: Array<boolean> /* = [false, false] */;
  baselineChecks: Array<boolean> /* = [false, false, false, false] */;

  constructor(knownFiles: KnownOscalFilesService) {
    this.knownFiles = knownFiles;
    this.entityChecks = new Array<boolean>(2);
    const countBaselines = (this.knownCat && this.knownCat.cat_baselines && this.knownCat.cat_baselines.length > 0) ? this.knownCat.cat_baselines.length : 4;
    this.baselineChecks = new Array<boolean>(countBaselines);
  }

  ngOnInit() {


  }

  refreshSelectedCatParts() {
    if (this.refreshCats) {
      this.refreshCats.emit();
      this.showInfo = false;
    }
  }

  showBaselines() {
    return !!this.knownCat && !!this.knownCat.cat_baselines && this.knownCat.cat_baselines.length > 0 && this.entityChecks[1];
  }

  onCheckEntityUpdate($o_event: Event, id: number = -1) {

    const $event = ($o_event as CustomEvent<CheckboxChangeEventDetail>);
    if (id < 2 && id >= 0) {
      this.entityChecks[id] = $event.detail.checked; //!this.entityChecks[id];
    }
    // console.log(`EB-Id: ${id}; Checked:${$event.detail.checked}`);
    // console.log($event);
    // console.log(this.entityChecks);
    $event.stopPropagation();
  }

  onCheckBaselineUpdate($o_event: Event, id: number = -1) {

    const $event = $o_event as CustomEvent;
    if (id < this.baselineChecks.length && id >= 0) {
      this.baselineChecks[id] = $event.detail.checked;
    }
    // console.log(`BL-Id: ${id};  Checked:${$event.detail.checked}`);
    // console.log($event);
    // console.log(this.baselineChecks);
    $event.stopPropagation();
  }

  formCommitArray(): Array<Array<boolean>> {
    return [this.entityChecks, this.baselineChecks];
  }

}

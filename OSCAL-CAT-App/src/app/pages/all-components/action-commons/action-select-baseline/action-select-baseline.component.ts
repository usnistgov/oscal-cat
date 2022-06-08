import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oscal-select-baseline',
  templateUrl: './action-select-baseline.component.html',
  styleUrls: ['./action-select-baseline.component.scss'],
})
export class SelectBaselineComponent implements OnInit {


  // Baselines Handling
  showBaselinesOptions = false;
  baselinesMarked = false;
  baselinesSelected = false;
  baselinesTailored = false;


  constructor() { }

  ngOnInit() { }


  // BAselines implementation
  flipShowBAselineOptions() {
    console.log(`Flipping show to ${!this.showBaselinesOptions}`)
    this.showBaselinesOptions = !this.showBaselinesOptions;
  }

}

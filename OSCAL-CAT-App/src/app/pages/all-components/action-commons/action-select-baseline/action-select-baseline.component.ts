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
import { Component, OnInit } from '@angular/core';
import { BaselineCatComponent } from '../../baseline-cat/baseline-cat.component';

enum StateMark {
  noState = 0,
  markAll = 1,
  preCheck = 2,
  cutOut = 3,
  rollBack = 4,
}

@Component({
  selector: 'oscal-select-baseline',
  templateUrl: './action-select-baseline.component.html',
  styleUrls: ['./action-select-baseline.component.scss'],
})
export class SelectBaselineComponent implements OnInit {


  // Baselines Handling
  showBaselinesOptions = false;
  showBaselinesRadio = false;
  baselinesMarked = false;
  baselinesSelected = false;
  baselinesTailored = false;
  formState: StateMark = StateMark.noState;
  actionNames = ['No-State',
    'Mark All Baselines',
    'Pre-Check Baseline ...',
    'Cut-Out Baseline ...',
    'All Controls (Default)'];
  constructor() { }

  ngOnInit() { }

  // Baselines implementation
  flipShowBaselineOptions(): void {
    console.log(`Flipping show to ${!this.showBaselinesOptions}`)
    this.showBaselinesOptions = !this.showBaselinesOptions;
  }

  getIconForSelect(): string {
    if (this.formState == StateMark.markAll) {
      return 'brush';
    } if (this.formState == StateMark.rollBack) {
      return 'list';
    } if (this.formState == StateMark.preCheck) {
      return 'checkmark';
    } if (this.formState == StateMark.cutOut) {
      return 'cut-outline';
    }
  }

  getTitle(index: number): string {
    return this.actionNames[index];
  }

  processBaseline() {
  }

  optionChosen(): boolean {
    return (StateMark.noState != this.formState);
  }

  setState(value: StateMark) {
    this.formState = value;
  }

  stateColor(value: StateMark) {
    if (value == this.formState) {
      return 'success';
    } else {
      return '';
    }
  }

  isActive(value: StateMark) {
    return value == this.formState;
  }

  markAllBaselines() {
    this.formState = StateMark.markAll;
  }

  showBaselines(): boolean {
    this.showBaselinesRadio = (this.formState == StateMark.cutOut || this.formState == StateMark.preCheck);
    return this.showBaselinesRadio;
  }

}

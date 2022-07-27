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
import { Component, OnInit, Attribute, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CatalogService } from './../../../providers/oscal-data/catalog.service';

@Component({
  selector: 'oscal-select-families',
  templateUrl: './select-families.component.html',
  styleUrls: ['./select-families.component.scss'],
})
export class SelectFamiliesComponent implements OnInit {
  @Input()
  listStyle: boolean;

  cat: CatalogService;
  families: any;
  selectedValue: string;
  selectItems: Array<{ key: string; value: string }> = [];
  checkItems: Array<{ key: string; value: string; checked: boolean; }> = [];
  familyLabel = '';

  constructor() {
    console.log('!!! Beginning Select !!!');
    this.cat = new CatalogService();
    this.families = this.cat.getRawGroups();

    if (this.families) {
      this.families.forEach((fam, idx) => {
        const x = { key: fam.id.toUpperCase(), value: `${fam.title}` }; /* ${fam.id.toUpperCase()} - */
        const y = { key: x.key, value: x.value, checked: false };
        console.log(`X[${(idx + 1)}] = {${x.key}: ${x.value}}`);
        this.selectItems.push(x);
        this.checkItems.push(y);
      });
    } else {
      this.selectItems = [
        { key: '1', value: 'Entry 1' },
        { key: '2', value: 'Entering 2' },
      ];
    }
  }

  ngOnInit() { }

  selectionChange(event) {
    console.log(event.detail);
    console.log('in Change Event');
    const newLabel = this.selectItems.find(e => e.key === event.detail.value).value;
    console.log(`Cell Value:${newLabel}`);
    this.familyLabel = newLabel;
  }
}

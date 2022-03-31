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

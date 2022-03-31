import { Component, OnInit } from '@angular/core';
import { KnownOscalFilesService } from './../../../providers/oscal-files/known-files.service';
import { CurrentSessionData } from './../../../providers/app-state/state-nav-cat/state-kv-app.service';
import { KnownOscalFileLocation } from 'src/app/interfaces/known-locations';

@Component({
  selector: 'oscal-author-begin',
  templateUrl: './author-begin.component.html',
  styleUrls: ['./author-begin.component.scss'],
})
export class AuthorBeginComponent implements OnInit {

  savedWork: Array<string>;
  newDraft: boolean;
  oscalFiles: Array<KnownOscalFileLocation>;

  constructor(private session: CurrentSessionData) {
    this.oscalFiles = KnownOscalFilesService.getAllKnownFiles();
  }

  ngOnInit() {
    const savedItems = 'savedWork';
    if (this.session.isKeyValue(savedItems)) {
      this.session.getKeyValueObject(savedItems).then(
        (value: Array<string>) => {
          if (value && Array.isArray(value)) {
            this.savedWork = value;

          } else {
            this.savedWork = undefined;
            this.session.setKeyValueObject(savedItems, ['Work item 1', 'Work Item 1001']);
          }
        });
    }
  }

  popAlert(data: string, idx: number) {
    console.log(data);
    console.log(idx);
    data = data + idx;
    // alert(`Alert:\n\t${data}\n\tItem Number ${idx}`);
  }

}

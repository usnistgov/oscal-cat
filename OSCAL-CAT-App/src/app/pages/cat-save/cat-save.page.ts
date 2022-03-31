import { Component, OnInit } from '@angular/core';

// import * as fs from 'fs';
// import * as path from 'path';

@Component({
  selector: 'app-cat-save',
  templateUrl: './cat-save.page.html',
  styleUrls: ['./cat-save.page.scss', './../stylePages.scss'],
})
export class CatSavePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  saveFileLocally() {
    // const fs = require('fs')

    const content = 'Some B$ content!';
    // fs.writeFile('~/testFromWeb.txt', content, err => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   //file written successfully
    // })
  }

  readFile() {
    // const fs = require('fs')
    // const path = require('path')

    // fs.readFile(path.join(__dirname, '../../client/index.html'), 'utf8', (error, data) => {
    //   // ...
    // })

  }

}

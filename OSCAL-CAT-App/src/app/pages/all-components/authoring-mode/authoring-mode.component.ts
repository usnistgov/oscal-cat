import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { File } from '@ionic-native/file/ngx';
//import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

//import { AppFilesService } from './../../../providers/app-state/app-files/app-files.service';
//import { CatalogSamples } from '../../info-providers/app-state/state-oscal-document/oscal-catalog-sample';import { Component, OnInit } from '@angular/core';

import { LogManagerService, } from './../../../providers/logging/log-manager.service';
import { AuthoringMode, } from './../../../interfaces/app-state/app-state-types';
import { KnownOscalFilesService, } from './../../../providers/oscal-files/known-files.service';

enum FormState {
}

@Component({
  selector: 'oscal-authoring-mode',
  templateUrl: './authoring-mode.component.html',
  styleUrls: ['./authoring-mode.component.scss'],
  providers: [File, Platform],
})
export class AuthoringModeComponent implements OnInit {

  showLoader: boolean = false;
  configDataDir: string;
  modeFormDone = false;
  mode: AuthoringMode; // = AuthoringMode.AuthorProfileFromMultiple
  modeValues: Array<number> = Object.values(AuthoringMode).map((x) => { if ('number' === typeof (x)) { return x; } });
  modeLabels = [
    { label: 'No Mode Selected', on: true },
    { label: 'Simple Include / Exclude / Edit From a Single Catalog Template (...)', on: true },
    { label: 'Simple Include/Exclude/Edit from Multiple Catalog Templates (...)', on: false },
    { label: 'Author a New Baseline from Existing Catalog (...)', on: true },
    { label: 'Author a New Catalog from Scratch', on: false },
  ];

  hideProgressBar(flag: boolean = true) {
    this.showLoader = !flag;
  }

  constructor(private fileOperations: File, private platform: Platform, private logger: LogManagerService) {
    /*, private appFiles: AppFilesService */
    this.hideProgressBar(false);
    for (const e in AuthoringMode) {
      if (true) {
        console.log(` Logging in Constructor ${e}`);
      }
    }
    const cats = KnownOscalFilesService.getKnownCatSampleFiles();
    // const pros = KnownOscalFilesService.getKnownProfileSampleFiles();
    this.modeLabels = [
      {
        label: 'Load Previously Saved Work',
        on: true
      },
      {
        label: 'Simple Include / Exclude / Edit From a Single Catalog Template (...)',
        on: true
      },
      {
        label: 'Simple Include/Exclude/Edit from Multiple Catalog Templates (...)',
        on: false
      },
      {
        label: 'Author a New Baseline from Existing Catalog (...)',
        on: true
      },
      {
        label: 'Author a New Catalog from Scratch',
        on: false
      },
    ];
    // this.writeJsonFile();
    // this.fileOperations.writeFile('/uiOSCAL' /* path */, 'workFiles.json', '{"X":"Test-Test-Test-Test-Test-Test"}', { replace: true });

  }

  // async writeJsonFile(
  //   filePath: string
  //     = 'OSCAL-CAT/history.txt',
  //   jsonData: string
  //     = '{"list": ["This is a test #1","This is a test #2","This is a test #3$%^$#@"]}'
  // ) {
  //   await Filesystem.writeFile({
  //     path: filePath,
  //     data: jsonData,
  //     directory: Directory.Data,
  //     encoding: Encoding.UTF8,
  //   });
  // }

  // async readFile() {
  //   const contents = await Filesystem.readFile({
  //     directory: Directory.Data,
  //     path: 'OSCAL-CAT/history.txt',
  //     encoding: Encoding.UTF8,
  //   });
  //   return contents;
  // }

  // async writeFile(information: string) {
  //   const contents = await Filesystem.writeFile({
  //     data: information,
  //     directory: Directory.Data,
  //     path: 'OSCAL-CAT/history.txt',
  //     encoding: Encoding.UTF8,
  //   });
  //   return;
  // }

  getItemLabel(choice: number = 0) {
    console.log(`getLabel ${choice}`);
    return this.modeLabels[choice];
  }

  ngOnInit() {

    // this.configDataDir = Directory.Data;

    // this.platform.ready().then(
    //   () => {
    //     const extDD = this.fileOperations.externalApplicationStorageDirectory;
    //     const extRD = this.fileOperations.externalRootDirectory;
    //     const tmpD = this.fileOperations.tempDirectory;
    //     this.configDataDir = this.fileOperations.dataDirectory;
    //     console.log(`
    //      Platform: ${this.platform.platforms()}
    //      IsDesktop: ${this.platform.is('desktop')}
    //      DataDir:${this.configDataDir}
    //      DocsDir:${this.fileOperations.documentsDirectory}
    //      AppDir: ${this.fileOperations.applicationDirectory}
    //      ExtDocDir:${extDD}
    //      TemDir:${tmpD}
    //      ExtRD:${extRD}
    //      `);
    //     this.fileOperations.createDir('' /* path */, '/uiOSCAL'/* dir-name */, false /*replace*/);
    //     this.fileOperations.createFile('/uiOSCAL'/* path */, 'workFiles.json' /* file-name */, false /*replace*/);
    //     // writeFile(path: string, fileName: string, text: string | Blob | ArrayBuffer, options?: IWriteOptions): Promise<any>
    //     this.fileOperations.readAsBinaryString('/uiOSCAL' /* path */, 'workFiles.json')
    //       .then(
    //         (x) => {
    //           console.log(`Read:${x}; Dir:${this.fileOperations.applicationDirectory}`);
    //         }).catch(() => { console.log(`Error!!!`); });
    //   });

    // // this.writeFile('{"X":"Test-Test-Test-Test-Test-Test"}');
    // // this.readFile()
    //   .then((x) => {
    //     this.logger.logData(x, 3);
    //     console.log(`\nX.Data: ${x.data.toString()}\nDir: ${Directory.Documents}`);
    //     let jsonStr = x.data.replace(/\\n/g, '\\n')
    //       .replace(/\\'/g, '\\\'')
    //       .replace(/\\"/g, '\\"')
    //       .replace(/\\&/g, '\\&')
    //       .replace(/\\r/g, '\\r')
    //       .replace(/\\t/g, '\\t')
    //       .replace(/\\b/g, '\\b')
    //       .replace(/\\f/g, '\\f');
    //     jsonStr = jsonStr.replace(/[\u0000-\u001F]+/g, '');
    //     console.log(`\nJ.Data: ${jsonStr}`);
    //     const obj = JSON.parse(jsonStr);
    //   });

    this.hideProgressBar(true);
  }

  radioClick(selected: number) {
    console.log(`Value: ${selected}`);
    this.mode = selected;
    console.log(`Enum: ${this.mode}`);
    this.hideProgressBar(true);
  }

  submitModeForm() {
    this.modeFormDone = (this.mode !== undefined && this.mode !== 0);
    console.log(`Button on mode: ${this.mode}, formOnOff: ${this.modeFormDone}`);
  }

  submitReset() {
    this.modeFormDone = false;
  }

}

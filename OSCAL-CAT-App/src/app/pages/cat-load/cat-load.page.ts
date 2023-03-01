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
import { Console, time } from 'console';
import { Catalog, Profile } from 'src/app/interfaces/oscal-types/oscal-catalog.types';
import { FilePullResult, OscalRemoteFile, OsFileOperations } from 'src/app/providers/app-state/state-nav-cat/os-files.service';

@Component({
  selector: 'app-cat-load',
  templateUrl: './cat-load.page.html',
  styleUrls: ['./cat-load.page.scss', './../stylePages.scss'],
})
export class CatLoadPage implements OnInit {
  fileToUpload: File | null = null;
  isCatLoadDone = false;
  recCatSchema = require('/src/assets/oscal-cats/json-schemas/oscal_catalog_schema.json');
  recProSchema = require('/src/assets/oscal-cats/json-schemas/oscal_profile_schema.json');
  catSchemaFromUrl: any;
  proSchemaFromUrl: any;
  // catSchema = require('https://raw.githubusercontent.com/usnistgov/OSCAL/main/json/schema/oscal_catalog_schema.json');
  loadedCat: Catalog;
  isProFromUrlLoadDone: boolean;
  isProFromUrlLoadDoneDone: boolean;


  constructor(
    private catFiles: OscalRemoteFile<Catalog>,
    private proFiles: OscalRemoteFile<Profile>,
    private schemaFiles: OscalRemoteFile<any>
  ) {
    this.loadCatSchema();
  }

  ngOnInit() {
  }


  loadCatSchema() {
    const url = 'https://raw.githubusercontent.com/usnistgov/OSCAL/main/json/schema/oscal_catalog_schema.json'
    this.catFiles.getHttpEntity<any>(url)
      .subscribe(
        data => { this.getCatSchema(data); },
        error => {// Process error
          console.log(`Error reading URL:${url}:\n\t${error}`);
          // Here fallback to the local resource
          this.isCatLoadDone = false;
        },
        () => { // Complete operation
          this.isProFromUrlLoadDoneDone = true;
        }
      );
  }

  getCatSchema(data: any) {
    console.log(data);
    console.log(`Loaded Schema`);
    this.catSchemaFromUrl = data;
    this.isProFromUrlLoadDone = true;
  }


  ionViewWillLeave(): void {
    // About to leave tha page - MUST update the session object
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  handleFileInput(files: FileList) {

    // await this.delay(1000);
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    // this.fileOperations.uploadFileToSession(files);
    console.log(`Getting the URL to load`);
    const url = 'https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_catalog.json';
    // this.fileOperations.getHttpFile(url);
    // Implementing Observable to pull out catalog
    /*    
    this.fileOperations.getHttpCatalog(url)
      .subscribe(
        data => { // On next operation
          console.log(data);
          this.loadedCat = data;
          // console.log(JSON.stringify(data));
          this.isCatLoadDone = true;
        },
        error => {// Process error
          console.log(`Error reading URL:${url}:\n\t${error}`);
          // Here fallback to the local resource
          this.isCatLoadDone = false;
        },
        () => { // Complete operation
          this.isCatLoadDone = true;
        }
  
      )
    if (this.isCatLoadDone) {
      console.log(`Schema validation: ${this.fileOperations.isObjectValid(this.loadedCat, this.catSchema)}`);
    } */
    // let catSchemaUrl = this.catFiles.getHttpEntity<any>('https://raw.githubusercontent.com/usnistgov/OSCAL/main/json/schema/oscal_catalog_schema.json');
    // let proSchemaUrl = this.catFiles.getHttpEntity<any>('https://raw.githubusercontent.com/usnistgov/OSCAL/main/json/schema/oscal_profile_schema.json');

    if (!!this.catSchemaFromUrl && this.isProFromUrlLoadDone && this.isProFromUrlLoadDoneDone) {
      this.catFiles.loadRemoteEntity('---', url, '==='); //, this.catSchemaFromUrl , this.onDataReadyCallback
      console.log(`Done?:${this.isProFromUrlLoadDone}\t Done2x?:${this.isProFromUrlLoadDoneDone}`);
    } else {
      console.log(`Done?:${this.isProFromUrlLoadDone}\t Done2x?:${this.isProFromUrlLoadDoneDone}`);
    }
  }

  onDataReadyCallback<ResultType>(result: FilePullResult<ResultType>) {
    console.log(result.resultEntity);
    console.log(result.validationInfo);
  }


  validateSchema() {
    if (this.isCatLoadDone) {
      console.log(`Schema validation: ${this.catFiles.isObjectValid(this.loadedCat, this.catSchemaFromUrl)}`);
    }
  }

  uploadFileToActivity() {
    // this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
    //   // do something, if upload success
    // }, error => {
    //   console.log(error);
    // });
  }

}

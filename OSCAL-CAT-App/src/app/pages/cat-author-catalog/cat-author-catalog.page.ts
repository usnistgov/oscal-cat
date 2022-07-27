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
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// import { CatalogService } from './../../providers/oscal-data/catalog.service';

@Component({
  selector: 'page-catalog',
  templateUrl: './cat-author-catalog.page.html',
  styleUrls: ['./cat-author-catalog.page.scss', './../stylePages.scss'],
})
// Catalog page implementation class
export class CatAuthorCatalogPage implements OnInit {
  formBuilder: FormBuilder;
  // catService: CatalogService;
  myForm: any;
  config: any;
  cat: any;
  conf: any;
  time: any;
  constructor() {
    this.time = new Date();

    // TODO: Hook Up KnownFiles into this page to make sure that 
    // the files are preloaded by the time they are needed

    // Selecting the structure with the controls
    // this.cat = require('./NIST-800-53-r4-cat-min.json');
    // this.config = require('./o-min.json');
    // this.conf = this.config.profile.imports.include['id-selectors'];

    // this.catService = new CatalogService();
    /*console.log(this.conf);
    for (const ctl of this.conf) {
      if (ctl) {
        console.log(`Control:${ctl['control-id']}`);
      }
    }*/
    // this.TraverseJson(this.config, 0);
    // End of the controls' structure selection
    this.formBuilder = new FormBuilder();
    this.myForm = this.formBuilder.group({
      meta_title: ['', Validators.compose([
        Validators.required])],
      cat_name: ['', Validators.compose([
        Validators.required])],
      cat_purpose: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])],
      cat_major: [0, Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])],
      cat_minor: [0, Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])],
      cat_release: [0, Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])],
      cat_date: ['', Validators.compose([
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required])]

    });
  }

  TraverseJson(config: any, depth: number) {
    return;
    depth += 1;
    if (depth > 6) {
      return 100;
    }
    for (const property in config) {
      if (property) {
        console.log(`Prop:${property} => Value:${config[property]}`);
        if (config[property]) {
          return this.TraverseJson(config[property], depth);
        } else {
          return 100;
        }
      }
    }
    return 100;
  }

  ProcessInputs() {
  }

  ngOnInit() {
  }

}

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

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

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder, FormArray, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { TreeItemEntry } from './../../providers/app-state/app-tree/tree-elements';
import { ActionWaitComponent } from './../all-components/action-commons/action-wait/action-wait.component';
import { CatalogService } from './../../providers/oscal-data/catalog.service';
@Component({
  selector: 'oscal-cat-select-cat-async',
  templateUrl: './cat-select-cat-async.page.html',
  styleUrls: ['./cat-select-cat-async.page.scss', './../stylePages.scss'],
})
export class CatSelectCatAsyncPage implements OnInit {
  alertCtrl: AlertController = new AlertController();
  cat: CatalogService;
  theTree$: Promise<Array<TreeItemEntry>>;
  userCanLeave = false;
  viewTab = 0;
  loading: any;



  constructor(theCatService: CatalogService, public modalController: ModalController) {


    this.cat = theCatService;
    // this.groups = this.cat.getTreeNodesStat();
  }

  async ngOnInit() {
    await this.presentLoading();
    this.loadTree().
      then(() => {
        this.loading.dismiss();
      });
  }

  async loadTree(useRev4 = true) {
    this.cat.getCatalog(useRev4);
    if (!this.theTree$) {
      console.log('Reading Tree');
      this.theTree$ = this.cat.getTreeNodesAsync();
    }
  }

  /**
   * Async loading progress pop-up
   *
   * CatSelectCatalogPage
   */
  async presentLoading() {
    this.loading = await this.modalController.create({
      component: ActionWaitComponent,
      componentProps: {
        title: 'Wait! Loading Catalog ...',
        color: 'primary',
        timeout: 43000,
      },
      cssClass: 'transparent-modal'
    });
    console.log('presentLoading')
    await this.loading.present();
  }



  viewModelChange(wasClicked: number) {
    this.viewTab = wasClicked;
    /*
    if (this.viewTab === wasClicked) {
      this.viewTab = (this.viewTab) % 3;
    } else {
    }*/
  }


  getProfileMode() {
    return this.viewTab;
  }

  getRadioState(id: number) { // Returns radio button On-Off image name
    return (this.viewTab === id) ? 'radio-button-on-outline' : 'radio-button-off-outline';
  }

  getRadioColor(id: number) { // Returns color
    return (this.viewTab === id) ? 'success' : '';
  }

  async ionViewCanLeave() {
    // here you can use other vars to see if there are reasons we want to keep user in this page:
    if (!this.userCanLeave) {
      return new Promise(async (resolve, reject) => {
        const alert = await this.alertCtrl.create({
          header: 'Are you sure?',
          message: 'The form data may be lost',
          buttons: [
            {
              text: 'Stay',
              role: 'cancel',
              handler: () => {
                console.log('User stayed');
                this.userCanLeave = false;
                reject();
              }
            }, {
              text: 'Leave',
              handler: () => {
                console.log('User leaves');
                this.userCanLeave = true;
                //resolve();
              }
            }, {
              text: 'Save',
              handler: () => {
                console.log('User saved data');
                // do saving logic
                this.userCanLeave = true;
                //resolve();
              }
            }
          ]
        });
        await alert.present();
      });
    } else { return true; }
  }





}

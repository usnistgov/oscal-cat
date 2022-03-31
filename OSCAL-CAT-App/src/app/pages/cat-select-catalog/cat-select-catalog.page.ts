import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { CatalogService } from './../../providers/oscal-data/catalog.service';
import { TreeItemEntry } from './../../providers/app-state/app-tree/tree-elements';
import { ActionWaitComponent } from './../all-components/action-commons/action-wait/action-wait.component';


@Component({
  selector: 'oscal-cat-select-catalog',
  templateUrl: './cat-select-catalog.page.html',
  styleUrls: ['./cat-select-catalog.page.scss', './../stylePages.scss'],
})
export class CatSelectCatalogPage implements OnInit {
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
    if (!this.theTree$) {
      await this.presentLoading();
      this.loadTree().then(() => { this.loading.dismiss(); });
    }
  }

  async loadTree() {
    this.theTree$ = this.cat.getTreeNodesAsync();
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
        timeout: 43000,
      }
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
                // resolve();
              }
            }, {
              text: 'Save',
              handler: () => {
                console.log('User saved data');
                // do saving logic
                this.userCanLeave = true;
                // resolve();
              }
            }
          ]
        });
        await alert.present();
      });
    } else { return true; }
  }

}

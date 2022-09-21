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
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


// import { SwUpdate } from '@angular/service-worker';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { CatalogData } from './info-providers/catalog-data';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const theme_dark = 'dark';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './pages/stylePages.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  userWarningAcceptedName = 'OC:App-Warning-Accepted';
  userAcceptanceYes = 'Warning Accepted';
  dark = true;
  appPartsPages = [
    {
      sequence: 1,
      title: 'Authoring Mode',
      url: '/cat-begin',
      icon: 'color-wand', // options, pricetags, push, shuffle
    }, {
      sequence: 1,
      title: 'Meta Info',
      url: '/cat-meta',
      icon: 'finger-print',
    }, {
      sequence: 1,
      title: 'All Controls',
      url: '/cat-select-async',
      icon: 'list', // cafe
    }, {
      sequence: 1,
      title: 'Selected Controls',
      url: '/pro-edit',
      icon: 'filter', // color-fill
    },
    // {
    //   sequence: 1,
    //   title: 'Regroup Controls',
    //   url: '/pro-group',
    //   icon: 'list-circle', // funnel
    // },
    // {
    //   sequence: 1,
    //   title: 'Back Matter',
    //   url: '/pro-back',
    //   icon: 'attach'
    // }, 
    // {
    //   sequence: 2,
    //   title: 'Review',
    //   url: '/review',
    //   icon: 'glasses'
    // },
    {
      sequence: 2,
      title: 'Download File',
      url: '/save',
      icon: 'cloud-download',
    },
    {
      sequence: 2,
      title: 'Upload File',
      url: '/load',
      icon: 'cloud-upload',
    },

    {
      sequence: 3,
      title: 'Settings',
      url: '/settings',
      icon: 'settings-outline',
    },
  ];



  constructor(
    public alertControl: AlertController,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
    prefersDark.addEventListener('change', (mediaQuery) => this.toggleDarkTheme());
  }

  // Add or remove the "dark" class based on if the media query matches
  toggleDarkTheme() {
    // Credit for inspiration
    // https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
    try {
      // Chrome & Firefox
      prefersDark.addEventListener(
        'change',
        (e) => {
          // console.log(`Toggling1 {this.dark?'ON':'OFF'}`);
          document.body.classList.toggle(theme_dark, this.dark)
        });
    } catch (e1) {
      try {
        // Safari
        prefersDark.addEventListener(
          'change',
          (e) => {
            // console.log(`Toggling2 {this.dark?'ON':'OFF'}`);
            document.body.classList.toggle(theme_dark, this.dark)
          });
      } catch (e2) {
        console.error(e2);
      }
    }
  }


  async ngOnInit() {
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      if (this.storage) {
        this.storage.create();
        this.storage.get(this.userWarningAcceptedName)
          .then(
            (data) => {
              console.log(data);
              if (data != this.userAcceptanceYes) {
                this.presentPersistanceWarning()
              }
            }
          );
      }
    });
  }


  /**
  * Function generates the Alert pop-up
  */
  async presentPersistanceWarning() {
    // const name = (item.fullName) ? item.fullName : item.name;
    // const uuid = item.uuid;
    const summaryHtml: string =
      `<h1>OSCAL-CAT Is a Serverless Application!</h1>`
      + `<div> <h3>Your work is saved only in your browser!`
      + ` If you want to persist your work between work sessions - please, save your work locally.<h3></div>`
      + `<h4> Warning! </h4>`
      + `<h5>If you clean your browser cache or history, your work will be deleted`
      + ` - that's the constraint of serverless web applications</h5>`;
    const alert = await this.alertControl.create({
      header: `!!! Application Persistance Warning !!!`,
      //subHeader: `Are You Sure?`,
      message: summaryHtml,
      cssClass: 'delete-alert-global-class',
      buttons: [
        {
          text: 'Accept Limitations',
          handler: () => {
            this.storage.set(this.userWarningAcceptedName, this.userAcceptanceYes);
            return true;
          }
        },
        {
          text: 'Cancel (Remind Again)',
          role: 'cancel',
          handler: data => {
            this.storage.set(this.userWarningAcceptedName, 'Nope! Remind Again!');
            return false;
          }
        },
      ]
    });
    await alert.present();
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  flipDarkMode() {
    // console.log(`Dark=${this.dark}`)
    this.toggleDarkTheme();
  }
}

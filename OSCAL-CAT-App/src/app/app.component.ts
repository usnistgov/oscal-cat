import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform, ToastController } from '@ionic/angular';
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

  dark = true;
  appPartsPages = [
    {
      sequence: 1,
      title: 'Authoring Mode',
      url: '/cat-begin',
      icon: 'color-wand' // options, pricetags, push, shuffle
    }, {
      sequence: 1,
      title: 'Meta Info',
      url: '/cat-meta',
      icon: 'finger-print'
    }, {
      sequence: 1,
      title: 'All Controls',
      url: '/cat-select-async',
      icon: 'list' // cafe
    }, {
      sequence: 1,
      title: 'Selected Controls',
      url: '/pro-edit',
      icon: 'filter' // color-fill
    }, {
      sequence: 1,
      title: 'Regroup Controls',
      url: '/pro-group',
      icon: 'list-circle' // funnel
    }, {
      sequence: 1,
      title: 'Back Matter',
      url: '/pro-back',
      icon: 'attach'
    }, {
      sequence: 2,
      title: 'Review',
      url: '/review',
      icon: 'glasses'
    },
    {
      sequence: 2,
      title: 'Download File',
      url: '/save',
      icon: 'cloud-download'
    },
    {
      sequence: 2,
      title: 'Upload File',
      url: '/load',
      icon: 'cloud-upload'
    },
  ];



  constructor(
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
          console.log(`Toggling1 {this.dark?'ON':'OFF'}`);
          document.body.classList.toggle(theme_dark, this.dark)
        });
    } catch (e1) {
      try {
        // Safari
        prefersDark.addEventListener(
          'change',
          (e) => {
            console.log(`Toggling2 {this.dark?'ON':'OFF'}`);
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
    });
  }


  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  flipDarkMode() {
    console.log(`Dark=${this.dark}`)
    this.toggleDarkTheme();
  }
}

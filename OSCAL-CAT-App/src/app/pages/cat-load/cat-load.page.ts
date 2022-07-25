import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cat-load',
  templateUrl: './cat-load.page.html',
  styleUrls: ['./cat-load.page.scss', './../stylePages.scss'],
})
export class CatLoadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  ionViewWillLeave(): void {
    // About to leave tha page - MUST update the session object

  }

}

import { AuthorBeginComponent } from './../all-components/author-begin/author-begin.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cat-begin',
  templateUrl: './cat-begin.page.html',
  styleUrls: ['./cat-begin.page.scss'],
})
export class CatBeginPage implements OnInit {

  @ViewChild(AuthorBeginComponent, { static: false }) private beginComponent: AuthorBeginComponent;

  constructor() { }

  ngOnInit() {
  }

  ionViewWillLeave(): void {
    console.log(`<<<!!!>>>Begin Page ()=>{ Will Leave } @${Date.now()}`);
    // The call into the handler of the on Leaving event of the component
    this.beginComponent.parentIonViewWillLeave();
  }

  stakeSession() {

  }

}

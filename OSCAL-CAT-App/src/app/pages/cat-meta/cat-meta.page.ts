import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthorBeginComponent } from '../all-components/author-begin/author-begin.component';

@Component({
  selector: 'app-cat-meta',
  templateUrl: './cat-meta.page.html',
  styleUrls: ['./cat-meta.page.scss', './../stylePages.scss'],
})
export class CatMetaPage implements OnInit, AfterViewInit {

  @ViewChild(AuthorBeginComponent, { static: false }) private metaInfo: AuthorBeginComponent;

  constructor() { }

  ngOnInit() {
  }

  processInputs() {

  }

  ngAfterViewInit() {
    // Bind UP the ChildView of the meta-info for the later 
    // session update pull-in from the ionViewWillLeave event

  }

  ionViewWillLeave(): void {
    // About to leave tha page - MUST update the session object

  }

}

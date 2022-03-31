import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';


import { PagesService, Page4UI, PrevCurrentNext } from './../../../providers/app-state/state-nav-cat/pages.service';

@Component({
  selector: 'oscal-nav-cat',
  templateUrl: './nav-cat.component.html',
  styleUrls: ['./nav-cat.component.scss'],
})

export class NavCatComponent implements OnInit {
  // @Input() canMoveNext?: any;

  // private store: Store<AppState>,
  currentPage: string;
  pageService: PagesService;
  pageState: PrevCurrentNext;



  constructor(private router: Router) {
    this.pageService = new PagesService();
  }

  ngOnInit() {
    const link = this.router.url;
    this.pageState = this.pageService.getCurrentNextState(link);

    console.log(`OnInit => 
                  Page: ${link}; 
                  Next>${this.pageState.next ? this.pageState.next.url : 'none'} 
                  & Prev<${this.pageState.prev ? this.pageState.prev.url : 'none'}`
    );
    // this.store.dispatch(); // <- This is action of getting PageState from AppState instead of Service if needed
  }

  nextPage() {
    if (this.pageState && this.pageState.next) {
      this.router.navigateByUrl(this.pageState.next.url);
    }
  }

  prevPage() {
    if (this.pageState && this.pageState.prev) {
      this.router.navigateByUrl(this.pageState.prev.url);
    }
  }

  getNextTitle(): string {
    if (this && this.pageState && this.pageState.next && this.pageState.next.title) {
      return `Next: ${this.pageState.next.title}`;
    } else {
      return `Next Page}`;
    }
  }

  getBackTitle(): string {
    if (this && this.pageState && this.pageState.prev && this.pageState.prev.title) {
      return `Back: ${this.pageState.prev.title}`;
    } else {
      return `Previous Page}`;
    }
  }
}

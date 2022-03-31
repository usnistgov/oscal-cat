import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TreeItemEntry } from '../../providers/app-state/app-tree/tree-elements';

@Component({
  selector: 'app-cat-control',
  templateUrl: './cat-control.page.html',
  styleUrls: ['./cat-control.page.scss', './../stylePages.scss'],
})
export class CatControlPage implements OnInit {
  userCanLeave = false;
  controlId: any;
  catId: any;
  item: TreeItemEntry;
  alertCtrl: AlertController = new AlertController();
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const qState = this.router.getCurrentNavigation().extras.state;
        this.controlId = qState.ctrlId;
        this.catId = qState.catId;
        this.item = qState.entity;
      }
    });
    console.log(`1st Param: ${this.controlId}; 2nd Param: ${this.catId}; Item: ${this.item.label}`);
  }

}

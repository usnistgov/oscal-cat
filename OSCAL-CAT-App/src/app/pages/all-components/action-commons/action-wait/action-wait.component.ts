import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-wait',
  templateUrl: './action-wait.component.html',
  styleUrls: ['./action-wait.component.scss'],
})
export class ActionWaitComponent implements OnInit {
  @Input() title: string;
  @Input() timeout: number;
  @Input() color: string;
  constructor() { }

  async ngOnInit() {
    this.title = this.title || 'Loading Information ...';
    this.color = this.color || 'tertiary';
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'oscal-settings-element',
  templateUrl: './action-settings-element.component.html',
  styleUrls: ['./action-settings-element.component.scss'],
})
export class ActionSettingsElementComponent implements OnInit {
  @Input() title: string;
  @Input() toolTip: string;
  @Input() buttonTitle: string;
  @Input() cookieName?: string;

  value: string;

  constructor() {

  }

  ngOnInit() {
    // Load the value from cookies
    this.value = '';
  }

  getTitle(): string {
    return this.title || `Setting`
  }

  getToolTip(): string {
    return this.toolTip || ``;
  }

  getButtonTitle(): string {
    return this.buttonTitle || ``;
  }

  onClick() {
    // Save the value into cookies

  }

}

"use strict";
import {Component} from 'angular2/core';
import {User} from '../../../common/models/User'
import {Auth} from '../../../common/services/Auth'
const template = require('./settings.jade');
declare var require: any;

@Component({
  selector: 'settings-component',
  template: template
})
export class SettingsComponent {
  public scriptText: string;
  constructor() {
    var url = 'www.babelot.ca/exclusiverentals.com';
    this.scriptText = `
      <script src="${url}"></script>
    `
  }
}

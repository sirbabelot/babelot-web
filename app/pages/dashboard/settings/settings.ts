"use strict";
import {Component} from 'angular2/core';
import {User} from '../../../common/models/User'
import {Auth} from '../../../common/services/Auth'
import {RouteParams, Router} from 'angular2/router';

const template = require('./settings.jade');
declare var require: any;

@Component({
  selector: 'settings-component',
  template: template
})
export class SettingsComponent {

  public scriptText: string;

  constructor(private _router: Router) {
    var url = 'www.babelot.ca/exclusiverentals.com';
    this.scriptText = `
      <script src="${url}"></script>
    `
  }
  
  gotoMessaging() {
    this._router.navigate(['Messaging']);
  }
}

  


import {Component, View} from 'angular2/core';
const template = require('./login.jade')
declare var require: any

@Component({
  selector: 'login-component'
})
@View({
  template: template
})
export class LoginComponent {
  yourName: string = template;
}

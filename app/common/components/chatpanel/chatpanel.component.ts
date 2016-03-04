import {Component} from 'angular2/core'
const template = require('./chatpanel.jade')
declare var require: any


@Component({
  selector: 'chat-panel',
  template: template
})
export class ChatPanel {}

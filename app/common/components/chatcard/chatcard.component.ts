import {Component} from 'angular2/core'
const template = require('./chatchard.jade')
declare var require: any


@Component({
  selector: 'chat-card',
  template: template
})
export class ChatCard {}

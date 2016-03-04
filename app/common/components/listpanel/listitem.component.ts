import {Component, Input} from 'angular2/core'
const template = require('./listitem.jade')
declare var require: any


@Component({
  selector: 'list-item',
  template: template
})
export class ListItem {
  @Input() conversation;
}

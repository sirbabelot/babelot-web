import {Component, Input} from 'angular2/core'
import {ListItem} from './listitem.component'
const template = require('./listpanel.jade')
declare var require: any


@Component({
  selector: 'list-panel',
  template: template,
  directives: [ListItem]
})
export class ListPanel {
  @Input() guests;
}

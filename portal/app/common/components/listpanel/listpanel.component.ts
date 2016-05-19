import {Component, Input} from 'angular2/core'
import {ListItem} from './listitem.component'
import {Messenger} from '../../services/Messenger'
const template = require('./listpanel.jade')
declare var require: any


@Component({
  selector: 'list-panel',
  template: template,
  directives: [ListItem]
})
export class ListPanel {

  @Input() contacts;
  constructor(public messenger: Messenger) {}

  get conversations() {
    var convos: any = [];
    this.messenger.conversationsMap.forEach((e) => convos.push(e));
    return convos;
  }
}

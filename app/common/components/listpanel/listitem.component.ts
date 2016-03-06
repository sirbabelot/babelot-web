import {Component, Input} from 'angular2/core'
import {User} from '../../services/User'
const template = require('./listitem.jade')
declare var require: any


@Component({
  selector: 'list-item',
  template: template
})
export class ListItem {
  @Input() conversation;
  constructor(private _user: User) {}

  removeContact(email) {
    this._user.removeContact(email)
  }
}

import {Component, Input} from 'angular2/core'
import {User} from '../../services/User'
const template = require('./listitem.jade')
declare var require: any


@Component({
  selector: 'list-item',
  template: template
})
export class ListItem {
  isContact: boolean;

  constructor(private _user: User) {}

  @Input() conversation;
  @Input() mode;
  ngOnInit() {
    this.isContact = this._user.isContact(this.conversation);
  }

  removeContact(email) {
    this._user.removeContact(email)
  }

  onLike(contact) {
    this._user.addContact(contact);
    this.isContact = true;
  }
}

import {Component, Input} from 'angular2/core'
import {User} from '../../models/User'
import {Messenger} from '../../services/Messenger'
import {Conversation} from '../../models/Conversation'
const template = require('./listitem.jade')
declare var require: any


@Component({
  selector: 'list-item',
  template: template
})
export class ListItem {
  isContact: boolean;

  constructor(
    private _user: User,
    public messenger: Messenger,
    public conversation: Conversation) {}

  @Input() contact;
  @Input() mode;
  ngOnInit() {
    var contact = _.find(this._user.contacts, (o)=> o.id === this.contact.id);
    if (contact) {
      this.isContact = true;
    }
  }

  openChatWith(contact) {
    this.conversation.contact = contact;
  }

  removeContact(contact, $event) {
    $event.stopPropagation();
    this.messenger.removeContact(contact);
  }

  onLike(contact, $event) {
    $event.stopPropagation();
    this.messenger.sendContactRequest(contact.id, this._user.serialize());
    this.isContact = true;
  }
}

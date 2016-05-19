import {Component, Input} from 'angular2/core'
import {User} from '../../models/User'
import {Messenger} from '../../services/Messenger'
import {Conversation} from '../../models/Conversation'
const template = require('./listitem.jade')
declare var require: any
declare var _: any


@Component({
  selector: 'list-item',
  template: template
})
export class ListItem {
  isContact: boolean;

  @Input() conversation;
  constructor(public messenger: Messenger) {}

  openChatWith(conversation) {
    this.messenger.currentConversation = conversation;
  }

  removeContact(conversation, $event) {
    $event.stopPropagation();
    this.messenger.removeConversation(conversation);
  }
}

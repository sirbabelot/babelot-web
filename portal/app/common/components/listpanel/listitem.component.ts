import {Component, Input} from 'angular2/core'
import {User} from '../../models/User'
import {Conversation} from '../../models/Conversation'
import {Messenger} from '../../services/Messenger'
import {ConversationHistory} from '../../services/ConversationHistory'

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
  constructor(public messenger: Messenger, public conversationHistory: ConversationHistory) {}

  openChatWith(conversation) {
    this.conversationHistory.loadMessageHistory(conversation);
    this.messenger.currentConversation = conversation;
  }

  removeContact(conversation, $event) {
    $event.stopPropagation();
    this.messenger.removeConversation(conversation);
  }
}

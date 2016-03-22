import {Component, Input} from 'angular2/core'
import {Messenger} from '../../services/Messenger'
import {User} from '../../models/User'
import {Conversation} from '../../models/Conversation'
import {ChatCard} from './chatcard.component'
const template = require('./chatpanel.jade')
declare var require: any


@Component({
  selector: 'chat-panel',
  template: template,
  directives: [ChatCard]
})
export class ChatPanel {


  constructor(
    public messenger: Messenger,
    private _user: User,
    public conversation: Conversation
  ) {}

  get messages() {
    return this.conversation.messages;
  }

  sendMessage(message) {
    this.messenger.sendMessage({
      room: this.conversation.contact.room,
      message: message.value
    });
    message.value = "";
  }
}

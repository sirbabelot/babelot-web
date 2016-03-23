import {Component, Input} from 'angular2/core'
import {Messenger} from '../../services/Messenger'
import {User} from '../../models/User'
import {Conversation} from '../../models/Conversation'
import {ChatCard} from './chatcard.component'
import {ScrollGlue} from '../../services/ScrollGlue'
const template = require('./chatpanel.jade')
declare var require: any


@Component({
  selector: 'chat-panel',
  template: template,
  directives: [ChatCard, ScrollGlue]
})
export class ChatPanel {

  @Input() demoMessages;
  constructor(
    public messenger: Messenger,
    private _user: User,
    public conversation: Conversation
  ) {}

  get messages() {
    return this.messenger.demoMessages;
  }

  sendMessage(message, agent) {
    if (!message.value.length)
      return false;
    console.log(window.agent)
    this.messenger.sendMessage({
      room: 'demo-id',
      message: message.value,
      author: window.agent
    });
    message.value = "";
  }
}

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
    private _user: User
  ) {}

  dropInput(event) {
    event.preventDefault();
    event.target.appendChild(window['dragged'].cloneNode(true));
    console.log(event.target.innerHTML);
    window['dragged'] = null;
  }

  sendMessage(message, agent) {
    if (!message.textContent.length)
      return false;
    this.messenger.sendMessage({
      message: message.textContent
    });
    message.textContent = "";
  }
}

import {Component, Input} from 'angular2/core'
import {User} from '../../models/User'
import {Messenger} from '../../services/Messenger'
const template = require('./chatcard.jade')
declare var require: any


@Component({
  selector: 'chat-card',
  template: template
})
export class ChatCard {
  @Input() message;
  constructor(private _user: User, public messenger: Messenger){}

  get sentByMe() {
    return this.message.author == window['agent'];
  }
}

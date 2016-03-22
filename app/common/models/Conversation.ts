import {Injectable} from 'angular2/core'
import {Contact} from './Contact'

@Injectable()
export class Conversation {
  private contact: Contact = new Contact();
  private messages: any;
  constructor(){}

  set contact(contact) { this._contact = contact; }
  get contact() { return this._contact; }

  get messages() { return this._contact.messages}

}

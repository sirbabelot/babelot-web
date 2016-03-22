import {Component, Input} from 'angular2/core';
import {Messenger} from '../../services/Messenger'
import {User} from '../../models/User'
const template = require('./requestspanel.jade')
declare var require: any

@Component({
  selector: 'request-panel',
  template: template
})
export class RequestPanel {
  @Input('requests') requests;

  constructor(private _messenger: Messenger, public user:User) {}

  closeDialog(request) {
    document.getElementById('contactRequests').close(request);
  }

  acceptRequest(request) {
    this.user.addContact(request);
    this.closeDialog(request);
  }

  rejectRequest(request) {
    this.user.rejectRequest(request);
    this.closeDialog(request);
  }
}

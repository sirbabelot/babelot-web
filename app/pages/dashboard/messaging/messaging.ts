///<reference path="./../../../typings/typings.d.ts"/>
import {Component} from 'angular2/core';
import {CanActivate, Router, RouteData} from 'angular2/router';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {ListPanel} from '../../../common/components/listpanel/listpanel.component'
import {ChatPanel} from '../../../common/components/chatpanel/chatpanel.component'
import {SimPreview} from '../../../common/components/sim/simpreview.component'
import {Messenger} from '../../../common/services/Messenger'
import {User} from '../../../common/models/User'
import {Me} from '../../../common/models/Me'
import {Conversation} from '../../../common/models/Conversation'


var _ = require('lodash');
const template = require('./messaging.jade');
var swal = require('sweetalert');
var co = require('co');

declare var require: any;
declare var _: any;
declare var co: any;
declare var winodw: any;

@Component({
  selector: 'messaging-component',
  template: template,
  directives: [ListPanel, ChatPanel, SimPreview]
})
export class MessagingComponent {

  contacts: any = [];
  demoContacts: any = [];
  currentUser: any = {};
  currentConversation: any = "";
  agent: string = 'client';


  constructor(
    public messenger: Messenger,
    private _router: Router
    ){}

  showRequestList() {
    let dialog: any = document.getElementById('contactRequests');
    dialog.showModal();
  }

  routerOnActivate() {}

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this._router.navigate(['/Login'])
  }
}

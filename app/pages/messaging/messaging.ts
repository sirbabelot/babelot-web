import {Component, View} from 'angular2/core';
import {CanActivate, Router, RouteData} from 'angular2/router';
import {ListPanel} from '../../common/components/listpanel/listpanel.component'
import {ChatPanel} from '../../common/components/chatpanel/chatpanel.component'
import {SimPreview} from '../../common/components/sim/simpreview.component'
import {SimSearchPanel} from '../../common/components/sim/simsearchpanel.component'
import {RequestPanel} from '../../common/components/requestspanel/requestspanel.component'
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {Messenger} from '../../common/services/Messenger'
import {User} from '../../common/models/User'
import {Me} from '../../common/models/Me'
import {Conversation} from '../../common/models/Conversation'


var _ = require('lodash');
const template = require('./messaging.jade');
var swal = require('sweetalert');
var co = require('co');

declare var require: any;
declare var _: any;
declare var co: any;


@Component({
  selector: 'messaging-component',
  template: template,
  directives: [ListPanel, ChatPanel, SimPreview, SimSearchPanel, RequestPanel]
})
export class MessagingComponent {

  contacts: any = [];
  currentUser: any = {};
  contactRequests: any = [];
  constructor(
    public user: User,
    public messenger: Messenger,
    public conversation: Conversation,
    private _router: Router){}

  showRequestList() {
    let dialog = document.getElementById('contactRequests');
    dialog.showModal();
    dialog.addEventListener('close', function() {
      console.log(this.returnValue);
    });
  }

  routerOnActivate() {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let id_token = localStorage.getItem('id_token');
    let headers = new Headers();
    headers.append('Authorization', `Bearer ${id_token}`);

    fetch(`https://docker.default/users/me`, { headers: headers })
      .then((res)=> res.json())
      .then((data)=> console.log(data));

    return fetch(`https://docker.default/users/me/requests`, { headers: headers })
      .then((res)=> res.json())
      .then((data)=> this.contactRequests = data)
      .then(()=> {
        document.querySelector('#messaging-view').style.display = 'block';
      });
  }

  ngOnInit() {
    this.contacts = this.user.contacts;

    this.user.loadContacts();
    this.messenger.on('chat message', (data) => {
      // TODO: make this faster using a hashmap
      var messageRecipient = _.find(this.user.contacts, (o) => o.room === data.room);
      messageRecipient.messages.push({
        body: data.message
      })
    });
  }

  get currentConversation() {
    return this.conversation.contact.nickname
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this._router.navigate(['/Login'])
  }
}

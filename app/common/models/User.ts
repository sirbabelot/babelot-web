import {Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
import {Messenger} from './../services/Messenger'
import {Auth} from './../services/Auth'
var _ = require('lodash');
var swal = require('sweetalert');
declare var require: any;
declare var _: any;

@Injectable()
export class User {

  // This nickname is only relevant for google users
  private _nickname: string;
  private _email: string;
  private _id: string;
  private _imgUrl: string;
  private _contactsList = [];
  private _token: string;
  private _currentChat: any;

  constructor(public http: Http, public messenger: Messenger, public auth: Auth) {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let id_token = localStorage.getItem('id_token');

    let domain = 'dharness.auth0.com';
    let clientId = 'WzaZ0ltsaHT03Knycz4HyMn7beYMMM9j';

    this.lock = new Auth0Lock(clientId, domain, {});

    // TODO find a non-invasive way to do this
    // this.http._defaultOptions.headers.append('Authorization', `Bearer ${id_token}`);
    this._nickname = 'profile.nickname';
    this._email = 'profile.email';
    this._id = 'profile.id';
    this._token = 'id_token';
    this._imgUrl = 'profile.img_url';
  }

  get id() { return this._id; }
  get token() { return this._token; }
  get email() { return this._email; }
  get nickname() { return this._nickname; }
  get contacts() { return this._contactsList; }
  get currentChat() { return this._currentChat; }
  set currentChat(contact) { this._currentChat = contact; }

  public loadContacts() {
    this.http.get(`https://docker.default/users/me/contacts`)
      .map((res) => JSON.parse(res.text()))
      .subscribe(
      (data) => {
        data.forEach((contactInfo) => {
          let room = [this._id, contactInfo.id].sort().join('::');
          // this.messenger.joinRoom(room);
          this._contactsList.length = 0;
          var contact = {
            id: contactInfo.id,
            email: contactInfo.email,
            img_url: contactInfo.img_url,
            room
          };
          console.log(contact);
        })
      }, (e) => swal("Oops...", e.text(), "error"));
  }

  public rejectRequest(request) {
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

    this.http.delete(`https://docker.default/users/me/requests/${request.id}`)
      .map((res) => JSON.parse(res.text()))
      .subscribe(
      (data) => {
        console.log(data)
      }, (e) => { swal("Oops...", e.text(), "error"); });
  }

  public addContact(contact) {
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);

    this.http.post(`https://docker.default/users/me/contacts`,
      JSON.stringify({ id: contact.id }))
      .map((res) => JSON.parse(res.text()))
      .subscribe(
      (data) => {
        this.loadContacts();
      }, (e) => { swal("Oops...", e.text(), "error"); });
  }

  isContact() {return true}

  searchGraph(searchTerm): any{
    return this.http.get(`https://docker.default/users/search?email=${searchTerm}`)
      .map((res) => JSON.parse(res.text()))
  }

  removeContact(contact) {
    this.http.delete(`https://docker.default/users/me/contacts/${contact.id}`)
      .map((res) => JSON.parse(res.text()))
      .subscribe((data) => {
      if (this.currentChat.id == contact.id) {
        this.currentChat = {};
      }
      this.loadContacts();
    })
  }
}

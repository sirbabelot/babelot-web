import {Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
import {Contact} from './Contact'
import {Messenger} from './../services/Messenger'
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

  constructor(public http: Http, public messenger: Messenger) {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let id_token = localStorage.getItem('id_token');

    // TODO find a non-invasive way to do this
    this.http._defaultOptions.headers.append('Authorization', `Bearer ${id_token}`);
    this._nickname = profile.nickname;
    this._email = profile.email;
    this._id = profile.id;
    this._token = id_token;
    this._imgUrl = profile.img_url;

    this.messenger.register(this._id);
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
          this.messenger.joinRoom(room);
          this._contactsList.length = 0;
          this._contactsList.push(new Contact(
            contactInfo.id,
            contactInfo.email,
            contactInfo.nickname,
            contactInfo.img_url,
            room
            ));
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

  searchGraph(searchTerm) {
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

  serialize(asString:boolean) {
    let importantData = {
      nickname: this._nickname,
      email: this._email,
      id: this._id,
      token: this._token,
      img_url: this._imgUrl
    };
    if (asString) {
      return `${importantData}`
    }
    return importantData;
  }
}

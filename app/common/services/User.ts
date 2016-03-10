import {Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
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
  private _contactsList = [];

  constructor(public http: Http) {
    // Load our user object from localStorage
    let profile = JSON.parse(localStorage.getItem('profile'));
    let id_token = localStorage.getItem('id_token');

    this._nickname = profile.nickname;
    this._email = 'profile.email';
    this._id = id_token;
    this._imgUrl = profile.img_url;
  }

  set email(email: string) {this._email = email}
  get email() {return this._email}
  get nickname() {return this._nickname}

  set contacts(list) {
    this._contactsList.length = 0;
    list.forEach((el)=> this._contactsList.push(el));
  }

  // CONTACTS
  get contacts() {
    this._loadContacts()
    return this._contactsList;
  }

  addContact(contact) {
    var headers = new Headers();
    headers.append('Authorization', `Bearer ${this._id}`);

    this.http.post(`https://docker.default/users/me/contacts`,
      JSON.stringify({ id: contact.id}) ,
      { headers: headers }
    )
    .map((res)=> JSON.parse(res._body))
    .subscribe(
      (data)=> {
        this._loadContacts();
      },
      (e)=> { swal("Oops...", e._body, "error"); }
    );
  }

  isContact(contact) {
    return _.some(this._contactsList, {id: contact.id});
  }

  searchGraph(searchTerm) {
    return this.http.get(`https://docker.default/users/search?email=${searchTerm}`, {
      headers: { Authorization: `Bearer ${this._id}` }
    })
    .map((res)=> JSON.parse(res._body))
  }

  removeContact(email) {
    this._contactsList.length = 0;
  }

  private _loadContacts() {
    this.http.get(`https://docker.default/users/me/contacts`, {
      headers: { Authorization: `Bearer ${this._id}` }
    })
    .map((res)=> JSON.parse(res._body))
    .subscribe(
      (data)=> { this.contacts = data; },
      (e)=> { swal("Oops...", e._body, "error"); }
    );
  }
}

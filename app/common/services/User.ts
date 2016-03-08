import {Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
var _ = require('lodash');
declare var require: any;
declare var _: any;

@Injectable()
export class User {

  private _nickname: string;
  private _email: string;
  private _id: string;
  private _contactsList = [];

  constructor(public http: Http) {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let id_token = localStorage.getItem('id_token');

    this.http.get(`https://docker.default/user/${profile.user_id}`)
        .toPromise()
        .then(res => console.log(res))
        .catch((err)=>{console.log(err)});

    this._nickname = profile.nickname;
    this._email = profile.email;
    this._id = id_token;
  }

  set email(email: string) {this._email = email}
  get email() {return this._email}
  get nickname() {return this._nickname}

  // CONTACTS
  get contacts() {
    this._loadContacts()
    return this._contactsList;
  }

  removeContact(email) {
    this._contactsList.length = 0;
  }


  private _loadContacts() {
    _.times(1, ()=> {
      this._contactsList.push({
        name: 'jzapata@uwo.ca',
        phone: 'faker.PhoneNumber.phoneNumber()',
        img: 'http://placehold.it/55x55'
      });
    });
  }
}

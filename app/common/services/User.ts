import {Injectable} from 'angular2/core'
var _ = require('lodash');
declare var require: any;
declare var _: any;

@Injectable()
export class User {

  private _email: string;
  private _contactsList = [];

  constructor() {
  }


  // EMAIL
  set email(email: string) {this._email = email}
  get email() {return this._email}

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

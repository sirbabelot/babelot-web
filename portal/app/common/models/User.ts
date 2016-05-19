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

  constructor(public http: Http, public messenger: Messenger, public auth: Auth) {
    let profile = JSON.parse(localStorage.getItem('profile'));
    let id_token = localStorage.getItem('id_token');
  }

}

"use strict";
import {Component} from 'angular2/core';
import {Location, Router, RouterLink, RouteConfig} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {User} from '../../common/models/User'
import {Auth} from '../../common/services/Auth'
const template = require('./login.jade');
declare var require: any;
declare var $: any;

@Component({
  selector: 'login-component',
  template: template
})
export class LoginComponent {
  public message: string;
  public lock: any;
  public loginShowing = false;
  public user:any = {};

  constructor(public router: Router, public auth: Auth) { }

  showModal(modalId) {
    (<any>document.querySelector(`#${modalId}`)).showModal();
  }

  signup() {
    this.auth.signup(this.user, (err)=> {
      console.warn(err);
    }, (res)=> {
      this.stashUser(res.profile, res.id_token);
      this.router.navigate(['/Dashboard']);
    })
  }

  login() {
    this.auth.login(this.user, (err) => {
      console.warn(err);
    }, (res) => {
      this.stashUser(res.profile, res.id_token);
      this.router.navigate(['/Dashboard']);
    });
  }

  stashUser(profile, id_token) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', id_token);
  }

  loggedIn() {
    return tokenNotExpired();
  }
}

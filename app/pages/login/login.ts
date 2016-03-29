"use strict";
import {Component, View} from 'angular2/core';
import {Location, Router, RouterLink, RouteConfig} from 'angular2/router';
import {Http, HTTP_PROVIDERS, Headers} from 'angular2/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {User} from '../../common/models/User'
const template = require('./login.jade');
var co = require('co');
declare var require: any;
declare var Auth0Lock: any;

@Component({
  selector: 'login-component',
  template: template,
  directives: [RouterLink],
  viewProviders: [HTTP_PROVIDERS]
})
export class LoginComponent {

  lock = new Auth0Lock('WzaZ0ltsaHT03Knycz4HyMn7beYMMM9j', 'dharness.auth0.com');
  public message: string;

  constructor(public router: Router, public http: Http) { }

  signup() {
    this.lock.showSignup({}, (err: string, profile, id_token: string) => {
      let headers = new Headers();
      headers.append('Authorization', `Bearer ${id_token}`);
      this.http.post(`https://docker.default/users/graph/`, JSON.stringify({
        id: profile.user_id,
        email: profile.email,
        nickname: profile.nickname,
        img_url: profile.picture
      }), { headers })
        .map((res) => JSON.parse(res.text()))
        .subscribe((data) => {
        this.stashUser(data.user, id_token);
        this.router.navigate(['/Messaging']);
      }, (err) => {
          this.message = err._body;
        })
    })
  }

  login() {
    this.lock.show({
      closable: false,
      rememberLastLogin: false,
      sso: false
    }, (err: string, profile, id_token: string) => {
        if (err) { throw new Error(err); }
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${id_token}`);
        this.http.get(`https://docker.default/users/graph/${profile.user_id}`,
          { headers })
          .map((res) => JSON.parse(res.text()))
          .subscribe(
          (data) => {
            this.stashUser(data, id_token);
            this.router.navigate(['/Messaging']);
          },
          (err) => {
            if (err.status === 404) {
              this.message = err._body;
            }
          }
          );
      })
  }
  // TODO: find a way around this without using local storage
  stashUser(profile, id_token) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', id_token);
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }
}

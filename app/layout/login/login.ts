import {Component, View} from 'angular2/core';
import {Location, Router, RouterLink, RouteConfig} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {User} from '../../common/services/User'
const template = require('./login.jade')
declare var require: any;
declare var Auth0Lock: any;

@Component({
  selector: 'login-component',
  template: template,
  directives: [RouterLink]
})
export class LoginComponent {

  lock = new Auth0Lock('WzaZ0ltsaHT03Knycz4HyMn7beYMMM9j', 'dharness.auth0.com');

  constructor(
    public router: Router,
    public user: User
  ) {}

  login() {
    this.lock.show((err:string, profile:string, id_token:string) => {
      if(err) {throw new Error(err);}
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      this.router.navigate(['/Messaging'])
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

}

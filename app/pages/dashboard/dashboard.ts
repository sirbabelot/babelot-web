import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';
import {SettingsComponent} from './settings/settings'
import {MessagingComponent} from './messaging/messaging'
import {Auth} from '../../common/services/Auth'
const template = require('./dashboard.jade');
declare var require: any;

@Component({
  template: template,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/settings', component: SettingsComponent, name: 'Settings', useAsDefault: true },
  { path: '/messaging', component: MessagingComponent, name: 'Messaging' }
])
export class DashboardComponent {

  constructor(public router: Router, public auth: Auth) {
    var currentUser = auth.currentUser;
    this.user = JSON.parse(currentUser);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/Login']);
  }

}

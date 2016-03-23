import {Component} from 'angular2/core'
import {RouteConfig, RouterOutlet, Router, ROUTER_DIRECTIVES, RouteData} from 'angular2/router';
import {LoginComponent} from './pages/login/login.ts'
import {MessagingComponent} from './pages/messaging/messaging.ts'
import {User} from './common/models/User'
import {Me} from './common/models/Me'
declare var fetch: any;


@Component({
  selector: 'babelot-app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/login', name: 'Login', component: LoginComponent
  }, {
    path: '/messaging/hotel', name: 'Messaging', component: MessagingComponent, data: {agent: 'hotel'}
  }, {
    path: '/messaging/client', name: 'Messaging', component: MessagingComponent, data: {agent: 'client'}
  }, {
    path: '/**', redirectTo: ['Messaging'] }
])
export class BabelotApp { }

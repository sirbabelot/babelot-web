import {Component} from 'angular2/core'
import {RouteConfig, RouterOutlet, Router, ROUTER_DIRECTIVES, RouteData} from 'angular2/router';
import {LoginComponent} from './pages/login/login.ts'
import {MessagingComponent} from './pages/messaging/messaging.ts'
import {User} from './common/models/User'
import {Me} from './common/models/Me'
import {ProtectedRouterOutlet} from './ProtectedRouterOutlet';
declare var fetch: any;

@Component({
  selector: 'babelot-app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES, ProtectedRouterOutlet]
})
@RouteConfig([
  { path: '/login', name: 'Login', component: LoginComponent }, {
    path: '/messaging', name: 'Messaging', component: MessagingComponent
  }, {
    path: '/**', redirectTo: ['Login'] }
])
export class BabelotApp { }

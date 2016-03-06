import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import {LoginComponent} from './layout/login/login.ts'
import {MessagingComponent} from './layout/messaging/messaging.ts'
import {User} from './common/services/User'
import {ProtectedRouterOutlet} from './ProtectedRouterOutlet';

@Component({
    selector: 'babelot-app',
    template: `<a [routerLink]="['./Messaging']">Messaging</a><router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, ProtectedRouterOutlet]
})
@RouteConfig([
  {path: '/login', name: 'Login', component: LoginComponent},
  {path: '/messaging', name: 'Messaging', component: MessagingComponent},
  {path: '/**', redirectTo:['Login']}
])
export class BabelotApp {}

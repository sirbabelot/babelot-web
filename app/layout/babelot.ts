import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import {LoginComponent} from './login/login.ts'
import {MessagingComponent} from './messaging/messaging.ts'


@Component({
    selector: 'babelot-app',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/login', name: 'Login', component: LoginComponent},
  {path: '/messaging', name: 'Messaging', component: MessagingComponent},
  {path: '/*path', redirectTo:['Login']}
])
export class Babelot {}

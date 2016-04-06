import {Component} from 'angular2/core'
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginComponent} from './pages/login/login.ts'
import {DashboardComponent} from './pages/dashboard/dashboard.ts'
declare var fetch: any;


@Component({
  selector: 'babelot-app',
  template: `<router-outlet></router-outlet>`,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/dashboard/...', component: DashboardComponent, name: 'Dashboard' },
  { path: '/login', component: LoginComponent, name: 'Login'},
  { path: '/**', redirectTo: ['Dashboard'] }
])
export class BabelotApp { }

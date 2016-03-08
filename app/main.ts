///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {provide} from 'angular2/core';
import {bootstrap}  from 'angular2/platform/browser';
import {BabelotApp} from './babelotApp';
import {User} from './common/services/User'
import {HTTP_PROVIDERS} from 'angular2/http'
import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

declare var require: any;
var styles = require('./styles/main.sass');

bootstrap(BabelotApp,[
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  User
]);

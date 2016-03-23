///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {provide} from 'angular2/core';
import {bootstrap}  from 'angular2/platform/browser';
import {BabelotApp} from './babelotApp';
import {User} from './common/models/User'
import {Messenger} from './common/services/Messenger'
import {Conversation} from './common/models/Conversation'
import {HTTP_PROVIDERS, ConnectionBackend} from 'angular2/http'
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
  ConnectionBackend,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  Conversation,
  User,
  Messenger
]);

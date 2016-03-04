///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {provide} from 'angular2/core';
import {bootstrap}  from 'angular2/platform/browser';
import {Babelot} from './layout/babelot';
import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

declare var require: any
var styles = require('./styles/main.sass')

bootstrap(Babelot,[
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);

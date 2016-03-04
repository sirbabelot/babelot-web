import {Component} from 'angular2/core'
var _ = require('lodash');
const template = require('./simsearchpanel.jade')
declare var require: any;
declare var _: any;


@Component({
    selector: 'sim-search-panel',
    template: template
})
export class SimSearchPanel {
    sims = [];
    constructor() {
        _.times(50, () => {
            this.sims.push({
                img: 'http://placehold.it/100x100',
                name: 'chance.name()'
            })
        })
    }
}

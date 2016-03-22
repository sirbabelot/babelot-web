import {Component, Input} from 'angular2/core'
import {ListItem} from './listitem.component'
import {User} from '../../models/User'
const template = require('./listpanel.jade')
declare var require: any


@Component({
  selector: 'list-panel',
  template: template,
  directives: [ListItem]
})
export class ListPanel {
  public listMode: string = 'contacts';
  public searchResults: any = [];

  @Input() contacts;
  constructor(public user: User) {}

  setListMode(mode) {
    this.listMode = mode;
  }

  updateList(searchTerm) {
    if (!searchTerm) {
      return this.searchResults.length = 0;
    }
    this.user.searchGraph(searchTerm)
        .map((res)=> {
          res.forEach((e)=> e.isContact = false);
          return res;
        })
        .subscribe(
          (data)=> this.searchResults = data,
          (e)=> console.log(e)
        )
  }
}

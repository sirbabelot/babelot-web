import {Component, View} from 'angular2/core';
import {ListPanel} from '../../common/components/listpanel/listpanel.component'
import {ChatPanel} from '../../common/components/chatpanel/chatpanel.component'
import {SimPreview} from '../../common/components/sim/simpreview.component'
import {SimSearchPanel} from '../../common/components/sim/simsearchpanel.component'
var _ = require('lodash');
const template = require('./messaging.jade');
var swal = require('sweetalert');
var co = require('co');

declare var require: any;
declare var _: any;
declare var co: any;

@Component({
  selector: 'messaging-component',
  template: template,
  directives: [ListPanel, ChatPanel, SimPreview, SimSearchPanel]
})
export class MessagingComponent {
  user = {email: 'thomas'}
  team = [];
  guests = [];
  constructor() {

    _.times(15, ()=> {
      this.guests.push({
        name: 'jzapata@uwo.ca',
        phone: 'faker.PhoneNumber.phoneNumber()',
        img: 'http://placehold.it/55x55'
      });
    });

    // generates team for left panel
    this.team.push({
      name: 'Dusty Panson',
      role: 'Maintenance',
      img: 'http://placehold.it/55x55'
    });
  }



  addContact() {
    swal({
      title: "Add a contact",
      text: "Enter the contacts email:",
      type: "input",
      showCancelButton: true,
      closeOnConfirm: false,
      inputPlaceholder: "noodle@doodle.com"
    }, (inputValue) => {
      if (inputValue === false) return false;
      if (inputValue === "") {
        swal.showInputError("You need to write something!");
        return false;
      }

      // this.user.post('connection', {
      //     connectionEmail: inputValue
      //   })
      //   .then(res => {
      //     this.guests.length = 0;
      //     this.ContactsService.add({
      //       name: res[0].email,
      //       phone: faker.PhoneNumber.phoneNumber(),
      //       img: 'http://placehold.it/55x55'
      //     });
      //
      //     swal("Nice!", `${inputValue} added to contacts!`, "success");
      //   })
      //   .catch(err => swal.showInputError(err.data))
    });
  }
}

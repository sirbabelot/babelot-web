import {Component, View} from 'angular2/core';
import {CanActivate, Router} from 'angular2/router';
import {ListPanel} from '../../common/components/listpanel/listpanel.component'
import {ChatPanel} from '../../common/components/chatpanel/chatpanel.component'
import {SimPreview} from '../../common/components/sim/simpreview.component'
import {SimSearchPanel} from '../../common/components/sim/simsearchpanel.component'
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {User} from '../../common/services/User'

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
    directives: [ListPanel, ChatPanel, SimPreview, SimSearchPanel],
})
export class MessagingComponent {
    team = [];
    guests = [];

    constructor(public user: User, private _router: Router) {
        // generates team for left panel
        this.team.push({
            name: 'Dusty Panson',
            role: 'Maintenance',
            img: 'http://placehold.it/55x55'
        });
    }

    ngOnInit() {
      var user = new User();
      user.email = 'naila nure'
      this.user = user;
    }

    logout() {
      localStorage.removeItem('profile');
      localStorage.removeItem('id_token');
      this._router.navigate(['/Login'])
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

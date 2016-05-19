import {User} from './User'


export class Me {

  private _nickname: string;
  private _email: string;
  private _id: string;
  private _imgUrl: string;
  private _contactsList = [];
  private _contactsRequests = [];
  private _token: string;
  private _currentChat: any;

  constructor(options:any) {
    this._nickname = options.nickname;
    this._email = options.email;
    this._id = options.id;
    this._imgUrl = options.img_url;
  }
  
  get contactRequests() { return this._contactsRequests }
  set contactRequests(list) { this._contactsRequests = list; }

  acceptRequest() {}
  rejectRequest() {}
}

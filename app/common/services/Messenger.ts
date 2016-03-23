import {Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
import {User} from './../models/User'
import {Contact} from './../models/Contact'
import {Request} from './../models/Request'
import {Conversation} from './../models/Conversation'

var io = require('socket.io-client')
var swal = require('sweetalert');
declare var Twilio: any;
declare var require: any;



@Injectable()
export class Messenger {
  public socket: any;
  public contacts: any = [];
  public requests: any = [];
  public messages: any = [];
  public agent: string = "client";
  public demoMessages: any = [];
  private _identity: string;
  private _token: string;
  private _channels = {};
  private _currentChannel: any = { messages: [] };
  private _imClient: any;

  constructor() {
    this.socket = io('https://docker.default');
    this.socket.on('receive contact request', (data)=> {
      alert(data)
    })
  }

  /****************************************************************************
                             Public Methods
  *****************************************************************************/

  public set currentChat(roomName: string) { this._currentRoom = roomName }

  public get currentChat() { return this._currentRoom; }

  public on(trigger, func) {
    return this.socket.on(trigger, func);
  }

  public joinDemo(userid) {
    this.socket.emit('join demo', userid);
  }

  public register(userid) {
    this.socket.emit('register', userid)
  }

  public joinRoom(roomName) {
    this.socket.emit('subscribe', roomName)
  }

  public sendMessage(options) {
    this.socket.emit('send message', {
      room: options.room,
      message: options.message,
      author: options.author
    });
  }

  public sendContactRequest(toId:string, me) {
    this.socket.emit('send contact request', {
      to: toId,
      from: me
    })
  }

}

import {Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
import {User} from './../models/User'
import {Request} from './../models/Request'
import {Conversation} from './../models/Conversation'

var io = require('socket.io-client')
var swal = require('sweetalert');
declare var require: any;


@Injectable()
export class Messenger {
  public socket: any;
  private roomId: string;
  private businessId: string = 'ExclusiveRentals.com';
  public isOnline: boolean = false;
  public currentConversation: any;
  public conversationsList: Conversation[] = new Array<Conversation>();
  public conversationsMap: Map<string, Conversation> = new Map<string, Conversation>();

  constructor() {
    this.socket = io('https://docker.default/ExclusiveRentals.com', { path: '/babelot/socket.io' });

    this.socket.on('message from server', (msg) => console.log(msg) );
    this.socket.on('client.nowOnline', (msg) => {
      let conversation = new Conversation(msg.roomId, msg.nickname, msg.fingerprint);
      console.log(conversation);
      this.conversationsMap.set(msg.fingerprint, conversation);
      this.currentConversation = conversation;
      this.sendMessage({message: 'Welcome to Canada'});
    });
    this.socket.on('direct message', (msg) => this.receiveMessage(msg));

    this.toggleOnline();
  }

  private receiveMessage(data) {
    let toConvo = this.conversationsMap.get(data.fingerprint);
    toConvo.messages.push({ body: data.message });
  }

  public sendMessage(options) {
    this.currentConversation.messages.push({
      author: 'me',
      body: options.message
    });
    this.socket.emit('direct message', {
      roomId: this.currentConversation.roomId,
      message: options.message
    });
  }

  public toggleOnline() {
    let newStatus = this.isOnline ? 'offline':'online';
    if (this.isOnline) {
      // TODO (dharness): using a while loop becuse TypeScript doesn't
      // support iterators yet :/
      var activeRooms: Array<string> = [];
      var roomIds = this.conversationsMap.keys();
      var roomId: string = roomIds.next().value;
      while (roomId) {
        activeRooms.push(roomId);
        roomId = roomIds.next().value;
      }
    }
    this.socket.emit(`business.changeStatus`, {
      activeRooms,
      status: newStatus,
      businessId: this.businessId
    });
    this.isOnline = !this.isOnline;
  }

  public removeConversation(conversation) {
    alert("NO")
    // this.conversationsMap.delete(conversation.fingerprint);
  }


}
import {Injectable} from 'angular2/core'
import {Http, Headers} from 'angular2/http'
import {User} from './../models/User'
import {Request} from './../models/Request'
import {Conversation} from './../models/Conversation'
import {ConversationHistory} from './ConversationHistory'

var io = require('socket.io-client')
var swal = require('sweetalert');
declare var require: any;
declare var BABLOT_API_URL: any;
declare var fetch: any;

@Injectable()
export class Messenger {
  public fingerprint = 'bablot_portal_experiment';
  public socket: any;
  private roomId: string;
  private businessId: string = 'DEMO_ID';
  public isOnline: boolean = false;
  public currentConversation: any;
  public conversationsMap: Map<string, Conversation> = new Map<string, Conversation>();
  public receivedMessages: string[];
  private BABLOT_BUSINESS_ID = 'DEMO_ID';

  constructor(public conversationHistory: ConversationHistory) {
    this.conversationHistory.getPreviewList().then((conversations) => {
      //Retrieves historic conversations to display in list panel
      conversations.forEach((conversationData) => {
        let AFinger = conversationData.convo.AFingerprint;
        let BFinger = conversationData.convo.BFingerprint;
        let clientFingerprint = AFinger === this.fingerprint ? BFinger : AFinger;
        let newConversation = new Conversation(conversationData.convo.RoomId, '', clientFingerprint, conversationData.firstMessage);
        this.conversationsMap.set(conversationData.convo.RoomId, newConversation);
      })
    });

    this.socket = io(`${BABLOT_API_URL}/${this.BABLOT_BUSINESS_ID}`);

    this.receivedMessages = [];

    this.socket.on('client.nowOnline', (msg) => {
       console.log(this.conversationsMap);
      var client = this.conversationsMap.get(msg.fingerprint)
      console.log(client);
      // if(!client){
        console.log('msg', msg);
        let conversation = new Conversation(msg.roomId, msg.nickname, msg.fingerprint, '');
        conversation.online = false;
        if (msg.status == 'online') {
          conversation.online = true;
        }

        this.conversationsMap.set(msg.fingerprint, conversation);
        this.currentConversation = conversation;
        // this.sendMessage({ message: 'Welcome to Canada' });
      // }else{
      //   client.online = true;
      //   console.log('New client now online!', client);
      // }
    });

    this.socket.on('client.statusChanged', (data) => {
      this.conversationsMap.get(data.fingerprint).online = false;
    });

    this.socket.on('direct message', (msg) => this.receiveMessage(msg));
  }

  private receiveMessage(data) {
    let toConvo = this.conversationsMap.get(data.fromFingerprint);
    toConvo.messages.push({ 
      FromFingerprint: data.FromFingerprint,
      body: data.message 
    });
    this.receivedMessages.push(data.message);
  }

  public sendMessage(options) {
    console.log('curent conversation', this.currentConversation);
    this.currentConversation.messages.push({
      FromFingerprint: this.fingerprint,
      body: options.message
    });
    this.socket.emit('direct message', {
      roomId: this.currentConversation.roomId,
      message: options.message,
      fromFingerprint: this.fingerprint,
      toFingerprint: this.currentConversation.roomId
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

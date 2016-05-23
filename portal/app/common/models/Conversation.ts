import {Injectable} from 'angular2/core'


export class Conversation {

  public messages: any = [];
  public online: boolean;

  constructor(
    public roomId: string,
    public nickname: string,
    public fingerprint: string,
    public firstMessage: string
    ) {}
}

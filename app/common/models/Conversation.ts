import {Injectable} from 'angular2/core'


export class Conversation {

  public messages: any = [];

  constructor(
    public roomId: string,
    public nickname: string,
    public fingerprint: string
    ) {}
}

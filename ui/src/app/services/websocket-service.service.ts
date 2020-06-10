import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { Message } from '../components/model/Message';

@Injectable({
  providedIn: 'root',
})
export class WebsocketServiceService {
  url: string = 'http://localhost:8080/websocketapp';
  NEW_USER_URL: string = '/app/newUser';
  topic: string = '/topic/broadcast';
  app: string = '/app/message';
  stompClient: any;
  TIMEOUT: number = 5000;
  user: string;
  message: Message = {
    sender: '',
    message: '',
  };

  private msgSource = new BehaviorSubject<Message>({
    sender: '',
    message: '',
  });
  selectedMessage = this.msgSource.asObservable();

  constructor() {}

  connect(user: string) {
    this.user = user;
    console.log('initialize connection');

    let ws = new SockJS(this.url);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect(
      {},
      (e) => this.successConnection(e),
      this.callBackOnError
    );
  }

  successConnection(e) {
    console.log('succcessfull connection');
    this.stompClient.subscribe(this.topic, (res) =>
      res.body ? this.onMessageRecieved(JSON.parse(res.body)) : this.onMessageRecieved(res)
    );
    this.stompClient.send(
      this.NEW_USER_URL,
      {},
      JSON.stringify({ sender: this.user, message: 'NEW_USER_LOGIN' } as Message)
    );
  }

  onMessageRecieved(message: Message) {
    this.message = message;
    this.setMessage(message); 
  }

  getMessages(): Observable<Message> {
    return this.selectedMessage;
  }

  setMessage(message: Message) {
    this.msgSource.next(message);
  }

  disconnect() {
    console.log('disconnect: ');
    if (this.stompClient != null) this.stompClient.disconnect();
  }

  callBackOnError = (error) => {
    console.log('error: ' + error);
  };

  send(message: Message) {
    console.log('sending message: ' + JSON.stringify(message));
    if (this.stompClient != null)
      this.stompClient.send(this.app, {}, JSON.stringify(message));
  }

 
}

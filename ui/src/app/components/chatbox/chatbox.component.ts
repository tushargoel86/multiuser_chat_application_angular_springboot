import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketServiceService } from 'src/app/services/websocket-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../model/Message';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  user: string;
  data: Message = {
    sender: '',
    message: '',
  };
  users: string[];

  constructor(
    private webSocketService: WebsocketServiceService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.actRoute.snapshot.params.id;

    if (this.webSocketService.stompClient == null) {
      this.removeUserFromLocalStorage(this.user);
      window.location.replace('');
      //this.router.navigate(['']);
    }

    this.webSocketService.getMessages().subscribe((data) => {
      if (data !== null) {
        if (data.message === 'NEW_USER_LOGIN') {
          this.handleOnlineUsers(data.sender);
          if (this.user !== data.sender) this.messages.push(data);
        } else  this.messages.push(data);
        // } else if (data.message === 'LOG_OUT') {
        //   this.messages.push(data);
        // } else {
        //   this.messages.push(data);
        // }
      }
    });
  }

  handleOnlineUsers = (user: string) => {
    let tempUsers = localStorage.getItem('onlineUsers');
    this.users = tempUsers === null ? [] : tempUsers.split(':');
    console.log('online users', JSON.stringify(this.users));
    
    if (this.users.indexOf(user) === -1 )
         this.users.push(user);
    localStorage.setItem('onlineUsers', this.users.join(':'));
  };

  handleMessage = (e) => {
    e.preventDefault();
    var msg = { sender: this.user, message: this.data.message };
    this.webSocketService.send(msg);
    this.data = {
      sender: '',
      message: '',
    };
  };

  removeUserFromLocalStorage(user: string) {
    let tempUsers = localStorage.getItem('onlineUsers');
    this.users = tempUsers === null ? [] : tempUsers.split(':');
    this.users.forEach(user => {
      let index = this.users.indexOf(user);
      console.log('removing user from: ', index);
      if (index !== -1) this.users.splice(index, 1);
    });  
    localStorage.setItem('onlineUsers', this.users.join(":"));
  }

  disconnect = (e) => {
    e.preventDefault();
    this.removeUserFromLocalStorage(this.user);
    var msg = { sender: this.user, message: 'LOG_OUT' };
    this.webSocketService.send(msg);
    setTimeout(() => {
      this.webSocketService.disconnect();
      window.location.replace('');
     // this.router.navigate(['']);
    }, 1000);
  };

  ngOnDestroy() {
    this.removeUserFromLocalStorage(this.user);
    this.webSocketService.disconnect();
  }

}

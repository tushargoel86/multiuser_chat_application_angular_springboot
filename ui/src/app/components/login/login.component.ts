import { Component, OnInit } from '@angular/core';
import { WebsocketServiceService } from 'src/app/services/websocket-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string;
  isErrorVisible: boolean = false;

  constructor(private websocketSerice : WebsocketServiceService, private router: Router) { }

  ngOnInit(): void {
    this.isErrorVisible = false;
  }

  onClick(e, user: string) {
      e.preventDefault();
      this.user = user;

      let users = localStorage.getItem("onlineUsers");
      if (users !== null && users.indexOf(user) !== -1) {
            this.isErrorVisible = true;
      } else {
        this.websocketSerice.connect(user);   
        this.router.navigate([`/chatroom/${this.user}`]);
      }
  }
}

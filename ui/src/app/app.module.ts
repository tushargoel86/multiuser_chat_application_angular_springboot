import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WebsocketServiceService as WebsocketService } from './services/websocket-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatboxComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component'
import { ChatboxComponent } from './components/chatbox/chatbox.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'chatroom/:id', component: ChatboxComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

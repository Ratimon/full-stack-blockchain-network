import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ListviewComponent } from './listview/listview.component';
import { QueryviewComponent } from './queryview/queryview.component';
import { MessagesComponent } from './messages/messages.component';
import { RedisComponent } from './redis/redis.component';

@NgModule({
  declarations: [
    AppComponent,
    ListviewComponent,
    QueryviewComponent,
    MessagesComponent,
    RedisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

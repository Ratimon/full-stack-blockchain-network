import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListviewComponent } from './listview/listview.component';
import { QueryviewComponent } from './queryview/queryview.component';

@NgModule({
  declarations: [
    AppComponent,
    ListviewComponent,
    QueryviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

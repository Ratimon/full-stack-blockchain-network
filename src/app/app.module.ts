import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

import {
  MatDialogModule
} from '@angular/material';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store/index';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment'; // Angular CLI environment

// interceptor
import { ErrorInterceptor } from "./helpers/error-interceptor";
// import {BasicAuthInterceptor} from "./helpers/basic-auth-interceptor"

// components
import { AppComponent } from './containers/app/app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from "./components/error/error.component";


export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze]: [];

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'wallet'
  },
  { path: 'wallet',
    loadChildren: '../wallet/wallet.module#WalletModule'
  },
  { path: 'faucet',
  loadChildren: '../faucet/faucet.module#FaucetModule'
},
  {
    path: '**',
    component: NotFoundComponent,
  }   
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.development ? StoreDevtoolsModule.instrument() : [],
    MatDialogModule
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    ErrorComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }

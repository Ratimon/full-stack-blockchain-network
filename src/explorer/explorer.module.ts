import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SharedModule} from  '../shared/shared.module'

import {
  MatExpansionModule,
  MatPaginatorModule
} from '@angular/material';

import {ScrollingModule} from '@angular/cdk/scrolling';

// containers
import * as fromContainers from './containers';

// components
import * as fromComponents from './components';

// services
import * as fromServices from './services';

// pipes
import {KeyValuePipe} from '@angular/common'
import * as fromPipes from './pipes';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'blocks'
  },
  {
    path: 'accounts',
    component: fromContainers.AccountsComponent,
  },
  {
    path: 'blocks',
    component: fromContainers.BlocksComponent,
  },
  {
    path: 'transactions',
    component: fromContainers.TransactionsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    ScrollingModule,
    SharedModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
  providers: [
    ...fromServices.services,
    KeyValuePipe
  ],
  declarations: [
    ...fromComponents.components,
    ...fromContainers.containers,
    ...fromPipes.customPipes,
  ]
})
export class ExplorerModule { }
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import {ScrollingModule} from '@angular/cdk/scrolling';

import {SharedModule} from  '../shared/shared.module'

import {FilterAddressPipe} from './pipes/filter-address.pipe'
import {FilterAddressSlicePipe} from './pipes/filter-address-slice.pipe'


import {
  // MatFormFieldModule,
  // MatCardModule,
  MatButtonModule,
  MatPaginatorModule
} from '@angular/material';

// containers
import * as fromContainers from './containers';

// components

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'transactions'
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
    // ScrollingModule,
    SharedModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [
    ...fromServices.services,
    FilterAddressPipe
  ]
    ,
  declarations: [
    ...fromContainers.containers,
    FilterAddressPipe,
    FilterAddressSlicePipe
  ]
})
export class ExplorerModule { }
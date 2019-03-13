import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SharedModule} from  '../shared/shared.module'

import {
  // MatFormFieldModule,
  // MatCardModule,
  MatButtonModule,
  MatPaginatorModule
} from '@angular/material';

import {ScrollingModule} from '@angular/cdk/scrolling';

// containers
import * as fromContainers from './containers';

// components
import { BlockItemComponent } from './components/block-item/block-item.component';

// services
import * as fromServices from './services';

// pipes
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
    MatButtonModule,
    MatPaginatorModule
  ],
  providers: [
    ...fromServices.services,
    ...fromPipes.providerPipes
  ]
    ,
  declarations: [
    ...fromContainers.containers,
    ...fromPipes.customScrollPipes,
    BlockItemComponent
  ]
})
export class ExplorerModule { }
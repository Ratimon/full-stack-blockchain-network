import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SharedModule} from '../shared/shared.module'

import {
  // MatFormFieldModule,
  MatTabsModule,
  MatButtonModule,
} from '@angular/material';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.GuestGuard],
    component: fromContainers.WalletComponent,
  },
  {
    path: 'dashboard',
    component: fromContainers.WalletDashboardComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // MatFormFieldModule,
    MatTabsModule,
    MatButtonModule,
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
  ],
  entryComponents: [
  ],
})
export class WalletModule { }
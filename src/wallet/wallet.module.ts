import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule
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
    // path: ':address',
    // canActivate: [fromGuards.AuthGuard],
    component: fromContainers.WalletDashboardComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
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
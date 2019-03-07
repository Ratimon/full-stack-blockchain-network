import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { WalletDialogComponent } from './components/wallet-dialog/wallet-dialog.component';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.WalletComponent,
  },
  {
    path: ':address',
    component: fromContainers.WalletDashboardComponent,
  },
  // {
  //   path: 'create',
  //   component: fromContainers.WalletDashboardComponent,
  // },
  // {
  //   path: 'recover',
  //   component: fromContainers.WalletDashboardComponent,
  // },
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
  providers: [...fromServices.services],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    WalletDialogComponent
  ],
  entryComponents: [
    WalletDialogComponent
  ],
})
export class WalletModule { }
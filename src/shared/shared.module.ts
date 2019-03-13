import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import {
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

// components
import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports:[
    ...fromComponents.components,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    ...fromComponents.components,
  ],
  providers: [
  ],
})
export class SharedModule { }

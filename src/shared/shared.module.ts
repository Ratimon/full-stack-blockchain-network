import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
} from '@angular/material';

// components
import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
  ],
  exports:[
    ...fromComponents.components,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
  ],
  declarations: [
    ...fromComponents.components,
  ],
  providers: [
  ],
})
export class SharedModule { }

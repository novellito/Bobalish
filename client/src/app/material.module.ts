import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}

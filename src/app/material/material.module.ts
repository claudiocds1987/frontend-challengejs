import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  exports: [
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ]
})
export class MaterialModule { }

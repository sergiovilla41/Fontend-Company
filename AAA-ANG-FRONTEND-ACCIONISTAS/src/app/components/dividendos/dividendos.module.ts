import { NgModule } from '@angular/core';

import { DividendosComponent } from './dividendos.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    InputNumberModule,
    InputTextModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  exports: [DividendosComponent],
  declarations: [DividendosComponent],
  providers: [],
})
export class DividendosModule { }

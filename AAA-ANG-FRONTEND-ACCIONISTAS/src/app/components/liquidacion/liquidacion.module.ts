import { NgModule } from '@angular/core';

import { LiquidacionComponent } from './liquidacion.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextModule
  ],
  exports: [LiquidacionComponent],
  declarations: [LiquidacionComponent],
  providers: [],
})
export class LiquidacionModule { }

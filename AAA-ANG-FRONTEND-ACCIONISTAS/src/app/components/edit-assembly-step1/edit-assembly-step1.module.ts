import { NgModule } from '@angular/core';

import { EditAssemblyStep1Component } from './edit-assembly-step1.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [EditAssemblyStep1Component],
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    InputNumberModule,
    ConfirmDialogModule
  ],
  exports: [EditAssemblyStep1Component],
  providers: [],
})
export class EditAssemblyStep1Module { }

import { NgModule } from '@angular/core';

import { AddAssemblyComponent } from './add-assembly.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [AddAssemblyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule
  ],
  exports: [AddAssemblyComponent],
  providers: [],
})
export class AddAssemblyModule { }

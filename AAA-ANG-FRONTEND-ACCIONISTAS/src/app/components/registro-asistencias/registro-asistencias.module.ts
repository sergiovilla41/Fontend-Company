import { NgModule } from '@angular/core';

import { RegistroAsistenciasComponent } from './registro-asistencias.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    InputSwitchModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  exports: [RegistroAsistenciasComponent],
  declarations: [RegistroAsistenciasComponent],
  providers: [],
})
export class RegistroAsistenciasModule { }

import { NgModule } from '@angular/core';

import { EditAssemblyStep2Component } from './edit-assembly-step2.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckboxModule } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    MatFormFieldModule,
    MatInputModule,
    TableModule,
    CheckboxModule,
    FormsModule,
    DialogModule
  ],
  exports: [EditAssemblyStep2Component],
  declarations: [EditAssemblyStep2Component],
  providers: [],
})
export class EditAssemblyStep2Module { }

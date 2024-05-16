import { NgModule } from '@angular/core';

import { EditAssemblyStep3Component } from './edit-assembly-step3.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    RadioButtonModule,
    FormsModule,
  ],
  exports: [EditAssemblyStep3Component],
  declarations: [EditAssemblyStep3Component],
  providers: [],
})
export class EditAssemblyStep3Module { }

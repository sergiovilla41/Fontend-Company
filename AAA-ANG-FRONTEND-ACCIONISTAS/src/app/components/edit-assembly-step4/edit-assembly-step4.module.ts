import { NgModule } from '@angular/core';

import { EditAssemblyStep4Component } from './edit-assembly-step4.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    RadioButtonModule,
    FormsModule
  ],
  exports: [EditAssemblyStep4Component],
  declarations: [EditAssemblyStep4Component],
  providers: [],
})
export class EditAssemblyStep4Module { }

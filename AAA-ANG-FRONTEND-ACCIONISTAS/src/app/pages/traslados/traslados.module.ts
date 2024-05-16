import { NgModule } from '@angular/core';

import { TrasladosComponent } from './traslados.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    MatFormFieldModule,
    MatInputModule,
    MultiSelectModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ConfirmDialogModule,
    MatProgressBarModule,
    TooltipModule
  ],
  exports: [TrasladosComponent],
  declarations: [TrasladosComponent],
  providers: [],
})
export class TrasladosModule { }

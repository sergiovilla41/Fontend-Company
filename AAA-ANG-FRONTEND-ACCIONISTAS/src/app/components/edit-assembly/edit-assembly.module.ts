import { NgModule } from '@angular/core';

import { EditAssemblyComponent } from './edit-assembly.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EditAssemblyStep1Module } from '../edit-assembly-step1/edit-assembly-step1.module';
import { RouterModule } from '@angular/router';
import { EditAssemblyStep1Component } from '../edit-assembly-step1/edit-assembly-step1.component';
import { CustomLayoutComponent } from 'src/app/custom-layout/custom-layout.component';
import { EditAssemblyStep2Module } from '../edit-assembly-step2/edit-assembly-step2.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditAssemblyStep3Module } from '../edit-assembly-step3/edit-assembly-step3.module';
import { EditAssemblyStep4Module } from '../edit-assembly-step4/edit-assembly-step4.module';
import { RegistroAsistenciasModule } from '../registro-asistencias/registro-asistencias.module';
import { DividendosModule } from '../dividendos/dividendos.module';
import { LiquidacionModule } from '../liquidacion/liquidacion.module';
import { CierreAsambleaModule } from '../cierre-asamblea/cierre-asamblea.module';

@NgModule({
  declarations: [EditAssemblyComponent],
  imports: [
    CommonModule,
    ButtonModule,
    BrowserAnimationsModule,
    TabMenuModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    StepsModule,
    EditAssemblyStep1Module,
    EditAssemblyStep2Module,
    EditAssemblyStep3Module,
    EditAssemblyStep4Module,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    RegistroAsistenciasModule,
    DividendosModule,
    LiquidacionModule,
    CierreAsambleaModule
  ],
  exports: [EditAssemblyComponent],
  providers: [],
})
export class EditAssemblyModule { }

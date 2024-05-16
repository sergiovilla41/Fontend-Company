import { createAction, props } from '@ngrx/store';
import { TablaCargar } from 'src/app/interfaces/shareholders.interface';
import { Assembly } from 'src/app/model/assembly.model';


export const exportExcelAssembly = createAction('[Assembly API] export Excel assembly', props<{ paginador: TablaCargar }>());
export const exportExcelAssemblySuccess = createAction('validate export Excel assembly Success', props<{ payload: any }>());
export const exportExcelAssemblyError = createAction('validate export Excel assembly error', props<{ msg: string, status: number }>());

export const exportCsvAssembly = createAction('[Assembly API] export Csv assembly', props<{ paginador: TablaCargar }>());
export const exportCsvAssemblySuccess = createAction('validate export Csv assembly Success', props<{ payload: any }>());
export const exportCsvAssemblyError = createAction('validate export Csv assembly error', props<{ msg: string, status: number }>());

export const exportPdfAssembly = createAction('[Assembly API] export Pdf assembly', props<{ paginador: TablaCargar }>());
export const exportPdfAssemblySuccess = createAction('validate export Pdf assembly Success', props<{ payload: any }>());
export const exportPdfAssemblyError = createAction('validate export Pdf assembly error', props<{ msg: string, status: number }>());


export const assemblyList = createAction('[Shareholder API] assemblyList');
export const assemblyListSuccess = createAction('assemblyList Success', props<{ assemblyList: Assembly[] }>());
export const assemblyListError = createAction('assemblyList error', props<{ msg: string, status: number }>());

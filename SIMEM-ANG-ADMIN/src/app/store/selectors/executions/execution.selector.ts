import { CommomDropdown } from '../../../shared/helpers/common-dropdown';
import { ExecutionData } from '../../interfaces/executions/execution.interface';
import { State } from '../../model/state.model';

export const selectExecutionItems = (state: State): ExecutionData[] =>
  state.executionInformation.executionInformation
    .map((a) => ({
      ...a,
      mes: {
        value: a.mes,
        label:
          a.mes != null
            ? (new CommomDropdown().GetMonthsMap() as any)[a.mes.toString()]
            : 'N/A',
      },
      dia: {
        value: a.dia,
        label:
          a.dia != null
            ? (new CommomDropdown().GetDaysMap() as any)[a.dia.toString()]
            : 'N/A',
      },
      hora: {
        value: a.hora,
        label:
          a.hora != null
            ? (new CommomDropdown().GetHoursMap() as any)[a.hora.toString()]
            : 'N/A',
      },
      diaSemana: {
        value: a.diaSemana,
        label:
          a.diaSemana != null
            ? (new CommomDropdown().GetWeekDaysMap() as any)[
                a.diaSemana.toString()
              ]
            : 'N/A',
      },
      indDiaHabil: {
        value: a.indDiaHabil,
        label:
          a.indDiaHabil != null
            ? (new CommomDropdown().GetYesNoMap() as any)[
                a.indDiaHabil.toString()
              ]
            : 'N/A',
      },
      indActivo: {
        value: a.indActivo,
        label:
          a.indActivo != null
            ? (new CommomDropdown().GetYesNoMap() as any)[
                a.indActivo.toString()
              ]
            : 'N/A',
      },
    }))
    .map((p) => ({ ...p }));

export const selectExecutionState = (state: State) =>
  state.executionInformation.executionDataState;

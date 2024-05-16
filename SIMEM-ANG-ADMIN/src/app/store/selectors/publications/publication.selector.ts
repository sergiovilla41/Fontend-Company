import { CommomDropdown } from '../../../shared/helpers/common-dropdown';
import { PublicationData } from '../../interfaces/publications/publication.interface';
import { State } from '../../model/state.model';

export const selectPublicationItems = (state: State): PublicationData[] =>
  state.publicationInformation.publicationInformation
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
    }))
    .map((p) => ({ ...p }));

export const selectPublicationState = (state: State) =>
  state.publicationInformation.publicationDataState;

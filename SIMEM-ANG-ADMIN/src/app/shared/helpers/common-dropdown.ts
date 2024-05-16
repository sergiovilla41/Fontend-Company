import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommomDropdown {
  constructor() {}

  getPeriodos() {
    return [
      { label: 'N/A', value: null },
      {
        label: 'Trimestre',
        value: 'Trimestre',
      },
      {
        label: 'Semestral',
        value: 'Semestral',
      },
    ];
  }

  getPeriodosMap() {
    return {
      Trimestre: 'Trimestre',
      Semestral: 'Semestral',
    };
  }

  GetDays(): any[] {
    let options = [];
    options.push({ label: 'N/A', value: null });
    for (let i = -3; i <= 28; i++) {
      if (i != 0) {
        options.push({ label: i.toString(), value: i });
      }
    }
    return options;
  }

  GetDaysExecutions(): any[] {
    let options = [];
    options.push({ label: 'N/A', value: null });
    for (let i = -3; i <= 31; i++) {
      if (i != 0) {
        options.push({ label: i.toString(), value: i });
      }
    }
    return options;
  }

  GetDaysMap(): Object {
    let options = {
      '-3': -3,
      '-2': -2,
      '-1': -1,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      '11': 11,
      '12': 12,
      '13': 13,
      '14': 14,
      '15': 15,
      '16': 16,
      '17': 17,
      '18': 18,
      '19': 19,
      '20': 20,
      '21': 21,
      '22': 22,
      '23': 23,
      '24': 24,
      '25': 25,
      '26': 26,
      '27': 27,
      '28': 28,
      '29': 29,
      '30': 30,
      '31': 31,
    };

    return options;
  }

  GetWeekDays(): any[] {
    let options = [
      { label: 'N/A', value: null },
      { label: 'Lunes', value: 0 },
      { label: 'Martes', value: 1 },
      { label: 'Miércoles', value: 2 },
      { label: 'Jueves', value: 3 },
      { label: 'Viernes', value: 4 },
      { label: 'Sábado', value: 5 },
      { label: 'Domingo', value: 6 },
    ];
    return options;
  }

  GetWeekDaysMap(): Object {
    let options = {
      '0': 'Lunes',
      '1': 'Martes',
      '2': 'Miércoles',
      '3': 'Jueves',
      '4': 'Viernes',
      '5': 'Sábado',
      '6': 'Domingo',
    };

    return options;
  }

  GetMonths(): any[] {
    let options = [
      { label: 'N/A', value: null },
      { label: 'Enero', value: 1 },
      { label: 'Febrero', value: 2 },
      { label: 'Marzo', value: 3 },
      { label: 'Abril', value: 4 },
      { label: 'Mayo', value: 5 },
      { label: 'Junio', value: 6 },
      { label: 'Julio', value: 7 },
      { label: 'Agosto', value: 8 },
      { label: 'Septiembre', value: 9 },
      { label: 'Octubre', value: 10 },
      { label: 'Noviembre', value: 11 },
      { label: 'Diciembre', value: 12 },
    ];
    return options;
  }

  GetMonthsMap(): Object {
    const months = {
      '1': 'Enero',
      '2': 'Febrero',
      '3': 'Marzo',
      '4': 'Abril',
      '5': 'Mayo',
      '6': 'Junio',
      '7': 'Julio',
      '8': 'Agosto',
      '9': 'Septiembre',
      '10': 'Octubre',
      '11': 'Noviembre',
      '12': 'Diciembre',
    };
    return months;
  }

  GetHours(): any[] {
    let options = [];
    for (let i = 0; i <= 23; i++) {
      let label = i.toString() + ' h';
      options.push({ label: label, value: i });
    }
    return options;
  }

  GetHoursMap(): Object {
    let options = {
      '0': '0 h',
      '1': '1 h',
      '2': '2 h',
      '3': '3 h',
      '4': '4 h',
      '5': '5 h',
      '6': '6 h',
      '7': '7 h',
      '8': '8 h',
      '9': '9 h',
      '10': '10 h',
      '11': '11 h',
      '12': '12 h',
      '13': '13 h',
      '14': '14 h',
      '15': '15 h',
      '16': '16 h',
      '17': '17 h',
      '18': '18 h',
      '19': '19 h',
      '20': '20 h',
      '21': '21 h',
      '22': '22 h',
      '23': '23 h',
    };

    return options;
  }

  GetYesNo(): any[] {
    let options = [
      { label: 'Si', value: true },
      { label: 'No', value: false },
    ];
    return options;
  }

  GetYesNoMap(): Object {
    let options = {
      true: 'Si',
      false: 'No',
    };
    return options;
  }

  GetDescSolutionQuality(): any[] {
    let options = [
      { label: 'N/A', value: null },
      { label: 'Eliminar', value: 'Eliminar' },
      { label: 'Pasar', value: 'Pasar' },
      { label: 'Error', value: 'Error' },
    ];
    return options;
  }

  GetDescSolutionQualityMap(): Object {
    const months = {
      Eliminar: 'Eliminar',
      Pasar: 'Pasar',
      Error: 'Error',
    };
    return months;
  }
}

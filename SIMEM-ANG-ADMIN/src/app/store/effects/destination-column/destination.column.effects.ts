import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { DestinationColumnService } from '../../http/destination-column/destination.column.service';
import { addDestinationColumn, addDestinationColumnError, addDestinationColumnSuccess, clearDestinationColumnStatus, getDestinationColumn, getDestinationColumnSuccess, updateDestinationColumn, updateDestinationColumnError, updateDestinationColumnSuccess } from '../../actions/destination-column/destination.column.action';


@Injectable()
export class DestinationColumnEffects {
  constructor(
    private actions$: Actions,
    private destinationColumnService: DestinationColumnService
  ) {}

  // Función para validar y convertir campos de fecha
  private validateAndConvertDateFields(destinationColumn: any): any {
    if (destinationColumn.fechaCreacion && !(destinationColumn.fechaCreacion instanceof Date)) {
      destinationColumn.fechaCreacion = new Date(destinationColumn.fechaCreacion);
    }
    if (destinationColumn.fechaActualizacion && !(destinationColumn.fechaActualizacion instanceof Date)) {
      destinationColumn.fechaActualizacion = new Date(destinationColumn.fechaActualizacion);
    }
    return destinationColumn;
  }

  // Efecto para obtener los elementos de la columna destino
  getDestinationColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDestinationColumn),
      exhaustMap(() =>
        this.destinationColumnService.getDestinationColumn().pipe(
          map(destinationColumns => {
            destinationColumns.forEach(item => this.validateAndConvertDateFields(item));
            return getDestinationColumnSuccess({ destinationColumns });
          }),
          catchError(error => of(addDestinationColumnError({ error })))
        )
      )
    )
  );

  // Efecto para actualizar un elemento de la columna destino
  updateDestinationColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDestinationColumn),
      exhaustMap(({ destinationColumn }) =>
        this.destinationColumnService.updateDestinationColumn(destinationColumn).pipe(
          map(() => {
            const validatedDestinationColumn = this.validateAndConvertDateFields(destinationColumn);
            return updateDestinationColumnSuccess({ destinationColumn: validatedDestinationColumn });
          }),
          catchError(error => of(updateDestinationColumnError({ error })))
        )
      )
    )
  );

  // Efecto para agregar un nuevo elemento a la columna destino
  addDestinationColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDestinationColumn),
      exhaustMap(({ destinationColumn }) =>
        this.destinationColumnService.addDestinationColumn(destinationColumn).pipe(
          map(() => {
            const validatedDestinationColumn = this.validateAndConvertDateFields(destinationColumn);
            return addDestinationColumnSuccess({ destinationColumn: validatedDestinationColumn });
          }),
          catchError(error => of(addDestinationColumnError({ error })))
        )
      )
    )
  );

   clearDestinationColumnStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDestinationColumnSuccess, updateDestinationColumnSuccess, addDestinationColumnSuccess),
      map(() => clearDestinationColumnStatus())
    )
  );
}

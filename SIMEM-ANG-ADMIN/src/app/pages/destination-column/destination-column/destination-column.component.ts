import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { State } from '../../../store/model/state.model';
import { filter } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
import { selectDestinationColumnStatusSave, selectDestinationColumns } from '../../../store/selectors/destination-column/destination.column.selector';
import { MessageService } from 'primeng/api';
import { DestinationColumnModel } from '../../../store/model/destination-column/destination.column.model';
import { addDestinationColumn, getDestinationColumn, updateDestinationColumn } from '../../../store/actions/destination-column/destination.column.action';
import { DestinationColumnComponentTemplate } from '../../../shared/components/templates/destination-column-template/destination-column-template/destination-column-template.component';

@Component({
  selector: 'app-destination-column',
  standalone: true,
  imports: [ CommonModule,
    ToastModule, MatNativeDateModule,DestinationColumnComponentTemplate],
  providers: [MessageService],
  templateUrl: './destination-column.component.html',
  styleUrl: './destination-column.component.scss'
})
export class DestinationColumnComponent implements OnInit {
  data = this.store.select(selectDestinationColumns);
  destinationColumns: DestinationColumnModel[] = [];

  constructor(private store: Store<State>, private messageService: MessageService) { }

  ngOnInit(): void {
    this.fetchDestinationColumn();
    this.subscribeToSaveStatus();
  }

  private subscribeToSaveStatus(): void {
    this.store.select(selectDestinationColumnStatusSave).subscribe((status) => {
      if (status === 'save') {
        this.handleSuccessfulSave();
      } else if (status === 'error') {
        this.handleError();
      }
    });
  }

  private handleSuccessfulSave(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Operación exitosa',
      detail: 'La operación se ha realizado satisfactoriamente'
    });

    this.destinationColumns = [];
    this.fetchDestinationColumn();
  }

  private handleError(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error en la operación',
      detail: 'Hubo un error al realizar la operación'
    });
  }

  fetchDestinationColumn(): void {
    this.store.dispatch(getDestinationColumn());
    this.data.pipe(
      filter(data => data !== null)
    ).subscribe({
      next: (data: DestinationColumnModel[] | null) => {
        if (data !== null) {
          this.destinationColumns = data;
        }
      },
      error: (error) => {
        console.error('Error fetching destination columns from store:', error);
      }
    });
  }

  createDestinationColumn(column: DestinationColumnModel): void {
    this.store.dispatch(addDestinationColumn({ destinationColumn: column }));
  }

  updateDestinationColumn(column: DestinationColumnModel): void {
    this.store.dispatch(updateDestinationColumn({ destinationColumn: column }));
  }
}

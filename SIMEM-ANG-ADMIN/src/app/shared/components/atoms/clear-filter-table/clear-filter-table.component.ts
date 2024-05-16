import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';

@Component({
  standalone: true,
  selector: 'simem-clear-filter-table',
  imports: [CommonModule, ButtonModule],
  templateUrl: './clear-filter-table.component.html',
  styleUrl: './clear-filter-table.component.scss',
})
export class ClearFilterTableComponent {
  @Input('tableData') tableData: Table | undefined;
  @Output() clearFilterPicker = new EventEmitter<void>();

  clearFilter() {
    if (this.tableData && typeof this.tableData.reset === 'function') {
      this.tableData.reset();
      this.clearFilterPicker.emit();
    }
  }
}

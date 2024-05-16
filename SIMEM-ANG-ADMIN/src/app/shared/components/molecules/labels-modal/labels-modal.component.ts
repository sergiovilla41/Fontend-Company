import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertiesList } from '../../../../store/interfaces/common-interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-labels-modal',
  templateUrl: './labels-modal.component.html',
  styleUrl: './labels-modal.component.scss',
  imports: [TableModule, ButtonModule, CardModule],
  standalone: true,
})
export class LabelsModalComponent {
  labelsData: PropertiesList[] = [];
  selectedLabels: PropertiesList[] = [];
  constructor(
    public dialogRef: MatDialogRef<LabelsModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      labels: PropertiesList[];
      labelsSelected: PropertiesList[];
    }
  ) {}
  ngOnInit(): void {
    const copiedArray = [...this.data.labels];
    this.labelsData = copiedArray;
    this.selectedLabels = this.data.labelsSelected;
  }

  onNoClick(): void {
    this.dialogRef.close({ result: true, category: {} });
  }
  close(): void {
    this.dialogRef.close({ result: true, category: {} });
  }

  onselecLabels() {
    this.dialogRef.close({ result: true, labels: this.selectedLabels });
  }
}

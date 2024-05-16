import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-show-selectxm-modal',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextareaModule,
    FormsModule,
  ],
  templateUrl: './show-selectxm-modal.component.html',
  styleUrl: './show-selectxm-modal.component.scss',
})
export class ShowSelectxmModalComponent implements OnInit {
  selectXM: string = '';
  constructor(
    public dialogRef: MatDialogRef<ShowSelectxmModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      selectXM: string;
    }
  ) {}
  ngOnInit(): void {
    this.selectXM = this.data.selectXM;
  }

  onNoClick(): void {
    this.dialogRef.close({ result: false, selectXM: '' });
  }
  close(): void {
    this.dialogRef.close({ result: false, selectXM: '' });
  }

  onAcceptSelect() {
    this.dialogRef.close({ result: true, selectXM: this.selectXM });
  }
}

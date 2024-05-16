import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "confirmacion-ejecucion-modal",
  templateUrl: "confirmacion-ejecucion-modal.component.html",
  styleUrls: ["confirmacion-ejecucion-modal.component.scss"],
})
export class ConfirmacionEjecucionModalComponent  {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionEjecucionModalComponent>,
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}

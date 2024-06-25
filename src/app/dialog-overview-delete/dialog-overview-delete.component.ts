import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-overview-delete',
  templateUrl: './dialog-overview-delete.component.html',
  styleUrl: './dialog-overview-delete.component.css'
})
export class DialogOverviewDeleteComponent {
  dialogTitle: string;
  dialogText: string;
  @Output() submitClicked = new EventEmitter<any>();

    constructor(
      public dialogRef: MatDialogRef<DialogOverviewDeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}


    ngOnInit() {
      this.dialogTitle = this.data;
      this.dialogText = "Sei sicuro di voler eliminare questa ricetta?"
    }

    saveMessage() {
      const data:String = 'Confirm';
      this.submitClicked.emit(data);
      this.dialogRef.close();
    }

    closeDialog() {
      this.dialogRef.close();
    }
}

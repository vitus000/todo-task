import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IConfirmDialogParams} from "../../models/models";

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogParams) {
    }

    ngOnInit() {
        const data = this.data;
    }

    close() {
        this.dialogRef.close();
    }

    onConfirm() {
      this.data.onConfirm();
      this.close();
    }
}

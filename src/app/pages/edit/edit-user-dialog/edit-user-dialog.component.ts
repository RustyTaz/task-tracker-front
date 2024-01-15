import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {
  editForm = new FormGroup({
    username: new FormControl(this.data.username, Validators.required),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
    role: new FormControl(this.data.role, Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      
      this.dialogRef.close(this.editForm.value);
    }
  }
}

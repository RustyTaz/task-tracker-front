import { Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { EditUserDialogComponent } from '../edit/edit-user-dialog/edit-user-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  
})
export class UserComponent {
  currentUser: any;

  constructor(private dialog: MatDialog, private userService: UserService, private authService: AuthService) {}
  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.currentUser = user;
    })
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '250px',
      data: { ...this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(this.currentUser.id, result).subscribe(updatedUser => {
          this.currentUser = updatedUser;
          this.authService.updateUserSubject(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        });
      }
    });
  }


}

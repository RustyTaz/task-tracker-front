import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-task-create-dialog',
  templateUrl: './task-create-dialog.component.html',
  styleUrls: ['./task-create-dialog.component.scss']
})
export class TaskCreateDialogComponent implements OnInit {
  taskForm!: FormGroup;
  users: any[] = [];
  teams: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<TaskCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
    this.loadTeams();
  }

  initializeForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['OPEN', Validators.required],
      priority: ['HIGH', Validators.required],
      responsibleUserId: ['', Validators.required],
      deadline: [new Date(), Validators.required],
      teamId: ['', Validators.required]
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  loadTeams(): void {
    this.teamService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const taskData = {
        ...this.taskForm.value,
        createdByUserId: JSON.parse(localStorage.getItem('user') || '{}').id,
        creationDate: new Date().toISOString()
      };
      this.dialogRef.close(taskData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
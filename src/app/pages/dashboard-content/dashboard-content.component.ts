import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { TaskCreateDialogComponent } from '../task-create-dialog/task-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent {
  tasks: any[] = []; 
  filteredTasks: any[] = [];
  teams: any[] = [];
  filteredTeams: any[] = [];
  selectedPriority = 'ALL';

  constructor(private taskService: TaskService, private teamService: TeamService, private router: Router, private dialog: MatDialog) {}
  ngOnInit() {
    this.loadTasks();
    this.loadTeams();
  }
  
  loadTasks() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
      this.filteredTasks = [...data]; 
    });
  }
  
  loadTeams() {
    this.teamService.getAllTeams().subscribe(data => {
      this.teams = data;
      this.filteredTeams = [...data]; 
    });
  }
  
  filterTasks() {
    if (this.selectedPriority === 'ALL') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.priority === this.selectedPriority);
    }
  }
  
  searchTeams(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (!searchTerm) {
      this.filteredTeams = [...this.teams];
    } else {
      this.filteredTeams = this.teams.filter(team => team.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
  }


  goToTeam(teamId: number) {
    this.router.navigate(['dashboard/team', teamId]);
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe(newTask => {
          this.tasks.push(newTask);
          this.filterTasks();
        });
      }
    });
  }
  
}

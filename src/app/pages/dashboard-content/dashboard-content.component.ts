import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';

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

  constructor(private taskService: TaskService, private teamService: TeamService) {}
  ngOnInit() {
    this.loadTasks();
    this.loadTeams();
  }
  
  loadTasks() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
      this.filteredTasks = [...data]; // Инициализация копией массива задач
    });
  }
  
  loadTeams() {
    this.teamService.getAllTeams().subscribe(data => {
      this.teams = data;
      this.filteredTeams = [...data]; // Инициализация копией массива команд
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

  getPriorityColor(priority: string) {
    switch (priority) {
      case 'HIGH': return 'red';
      case 'MEDIUM': return '#d3be06';
      case 'LOW': return 'blue';
      default: return 'black';
    }
  }

  getStatusIcon(status: string) {
    switch (status) {
      case 'OPEN': return 'alarm_on';
      case 'IN_PROGRESS': return 'play_circle_filled';
      case 'COMPLETED': return 'done';
      default: return 'help_outline';
    }
  }
}

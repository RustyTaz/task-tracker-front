import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() tasks: any[] = []; 
  filteredTasks: any[] = [];
  selectedPriority = 'ALL';

  constructor(private taskService: TaskService, private teamService: TeamService, private router: Router) {}
  ngOnInit() {
    //this.loadTasks();
    //this.filteredTasks = [...this.tasks];
  }
  
  // loadTasks() {
  //   this.taskService.getAllTasks().subscribe(data => {
  //     this.tasks = data;
  //     this.filteredTasks = [...data]; // Инициализация копией массива задач
  //   });
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.filteredTasks = [...this.tasks];
    }
  }

  
  filterTasks() {
    if (this.selectedPriority === 'ALL') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => task.priority === this.selectedPriority);
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
  goToTask(taskId: number) {
    this.router.navigate(['dashboard/task', taskId]);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  team: any;
  teamMembers: any[] = [];
  teamTasks: any[] = [];
  teamLeader: any;
  teamCreator: any;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService,
    private taskService: TaskService,
    
  ) {}

  ngOnInit(): void {
    const teamId = this.route.snapshot.params['id'];
    this.loadTeamData(teamId);
  }

  private loadTeamData(teamId: number) {
    this.teamService.getTeamById(teamId).subscribe(teamData => {
      this.team = teamData;
      this.loadTeamMembers(teamData.memberIds);
      this.loadTeamTasks(teamId);
      this.loadTeamLeader(teamData.teamLeaderId);
      this.loadTeamCreator(teamData.teamCreatorId);
    });
 }

 private loadTeamMembers(memberIds: number[]) {
   memberIds.forEach(memberId => {
     this.userService.getUserById(memberId).subscribe(memberData => {
       this.teamMembers.push(memberData);
     });
   });
 }

 private loadTeamTasks(teamId: number) {
   this.taskService.getTasksByTeamId(teamId).subscribe(tasksData => {
    console.log(tasksData);
    console.log(teamId);
    
     this.teamTasks = tasksData;
   });
 }

 private loadTeamLeader(leaderId: number) {
   this.userService.getUserById(leaderId).subscribe(leaderData => {
     this.teamLeader = leaderData;
   });
 }

 private loadTeamCreator(creatorId: number) {
  this.userService.getUserById(creatorId).subscribe(creatorData => {
    this.teamCreator = creatorData;
  });
}
}

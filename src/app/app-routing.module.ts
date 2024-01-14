import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './utils/auth.guard';
import { DashboardContentComponent } from './pages/dashboard-content/dashboard-content.component';
import { UserComponent } from './pages/user/user.component';
import { TeamComponent } from './pages/team/team.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{
  path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', component: DashboardContentComponent },
    { path: 'user', component: UserComponent },
    { path: 'teams', component: TeamComponent },
    { path: 'tasks', component: TaskComponent }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

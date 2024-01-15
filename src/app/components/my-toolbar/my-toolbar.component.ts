import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-toolbar',
  templateUrl: './my-toolbar.component.html',
  styleUrls: ['./my-toolbar.component.scss']
})
export class MyToolbarComponent {
  userName!: string;
  userSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.userName = user?.username;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  goToProfile() {
    this.router.navigate(['/dashboard/user']);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.authService.saveUser({});
    this.router.navigate(['/login']);
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard']);
  }
}

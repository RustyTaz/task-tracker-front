import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-toolbar',
  templateUrl: './my-toolbar.component.html',
  styleUrls: ['./my-toolbar.component.scss']
})
export class MyToolbarComponent {
  user!:string | null | undefined;

  constructor(private router: Router,
    private authService: AuthService){

      
    }

    ngAfterViewInit(){
      this.user = localStorage.getItem('user');
      this.user = this.user?.slice(1, -1);
      console.log(this.user);
    }



  goToProfile(){
    this.router.navigate(['/dashboard/user']);
  }

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
  goToDashBoard(){
    this.router.navigate(['/dashboard']);
  }
}

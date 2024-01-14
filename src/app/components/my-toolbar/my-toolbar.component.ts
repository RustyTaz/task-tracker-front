import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-toolbar',
  templateUrl: './my-toolbar.component.html',
  styleUrls: ['./my-toolbar.component.scss']
})
export class MyToolbarComponent {
  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}

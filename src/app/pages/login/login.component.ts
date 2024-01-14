import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(response => {
      console.log('Авторизация прошла успешно', response);
      // Сохранение токена и пользователя
      this.authService.saveToken(response.token);
      this.authService.saveUser(response.user);
      this.router.navigate(['/dashboard']);
    });
  }
}

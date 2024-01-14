import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('ANALYST') 
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(response => {
      console.log('Регистрация прошла успешно', response);
      // Сохранение токена и пользователя
      this.authService.saveToken(response.token);
      this.authService.saveUser(response.user);
      this.router.navigate(['/dashboard']);
    });
  }
}

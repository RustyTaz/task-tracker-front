import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Замените на URL вашего API
  public user:any;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  saveUser(user: any): void {

    this.user = user;
    console.log(this.user);
  
    //localStorage.setItem('user', JSON.stringify(user));
  }
}

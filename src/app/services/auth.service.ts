import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Замените на URL вашего API
  private userSubject$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));
  public user = this.userSubject$.asObservable();

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
    this.userSubject$.next(user);
    console.log(this.user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(){
    return this.userSubject$.value;
  }
  updateUserSubject(user: any) {
    this.userSubject$.next(user);
  }
}

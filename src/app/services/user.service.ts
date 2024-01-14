import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post
<any>(`${this.apiBaseUrl}`, user);
}

updateUser(id: number, user: any): Observable<any> {
return this.http.put<any>(`${this.apiBaseUrl}/${id}`, user);
}

deleteUser(id: number): Observable<void> {
return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
}

getUserByUsername(username: string): Observable<any> {
return this.http.get<any>(`${this.apiBaseUrl}/by-username/${username}`);
}
}
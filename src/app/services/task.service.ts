import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiBaseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}`);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/${id}`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}`, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
  }

  getTasksByTeamId(teamId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/by-team/${teamId}`);
  }
}
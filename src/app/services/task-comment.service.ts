import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {
  private apiBaseUrl = 'http://localhost:8080/api/task-comments';


  constructor(private http: HttpClient) { }

  createTaskComment(taskComment: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}`, taskComment);
  }

  updateTaskComment(id: number, taskComment: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/${id}`, taskComment);
  }

  deleteTaskComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
  }

  getCommentsByTaskId(taskId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/by-task/${taskId}`);
  }
}

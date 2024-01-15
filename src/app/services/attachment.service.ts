import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private apiBaseUrl = 'http://localhost:8080/api/attachments';

  constructor(private http: HttpClient) {}

  createAttachment(attachment: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}`, attachment);
  }

  deleteAttachment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
  }

  getAttachmentsByTaskId(taskId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/by-task/${taskId}`);
  }
}

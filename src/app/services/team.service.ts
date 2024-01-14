import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiBaseUrl = 'http://localhost:8080/api/teams';

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}`);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/${id}`);
  }

  createTeam(team: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}`, team);
  }

  updateTeam(id: number, team: any): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/${id}`, team);
  }

  deleteTeam(id:
    number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
  }

  getTeamByName(name: string): Observable<any> {
    return this.http.get<any>(`${ this.apiBaseUrl } / by - name / ${ name }`);
  }
}

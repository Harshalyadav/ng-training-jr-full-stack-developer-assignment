import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

const baseUrl = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/tasks`);
  }

  get(id: any): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/task/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/task `, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/task/update/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/task/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByAssignedTo(assignedTo: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}?assignedTo=${assignedTo}`);
  }
}

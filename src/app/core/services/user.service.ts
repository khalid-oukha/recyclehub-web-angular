import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/users';

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: string, updatedUserData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}`, updatedUserData);
  }

  deleteAccount(userId: string): Observable<void> {
    localStorage.removeItem('currentUser');
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}

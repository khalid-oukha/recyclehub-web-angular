import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/users';

  constructor(private http: HttpClient, private router: Router) {
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: string, updatedUserData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}`, updatedUserData);
  }

  deleteAccount(): Observable<void> {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    return this.http.delete<void>(`${this.apiUrl}/${currentUser.id}`).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      })
    );
  }
}

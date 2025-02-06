import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/users';

  constructor(private http: HttpClient, private router: Router) {
  }


  updateUser(userId: number, updatedUserData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, updatedUserData).pipe(
      catchError(error => {
        return throwError(() => new Error('Failed to update user'));
      })
    );
  }

  deleteAccount(): Observable<void> {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    return this.http.delete<void>(`${this.apiUrl}/${currentUser.id}`).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }),
      catchError(error => {
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }


}

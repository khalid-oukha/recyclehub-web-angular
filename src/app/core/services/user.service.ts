import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/users';

  constructor(private http: HttpClient, private router: Router) {
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

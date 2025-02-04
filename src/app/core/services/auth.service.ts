import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {catchError, map, Observable, of, switchMap, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private sessionKey = 'currentUser';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${credentials.email}&password=${credentials.password}`).pipe( // Filter by email and password directly (for demonstration with JSON Server)
      map((users: User[]) => {
        if (users.length === 1) {
          return users[0];
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      tap((user: User) => {
        localStorage.setItem(this.sessionKey, JSON.stringify(user));
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Invalid credentials'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.router.navigate(['/auth/sign-in']).then(r => true);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.sessionKey);
  }

  getUserDetails(): Observable<User | null> {
    const user = JSON.parse(localStorage.getItem(this.sessionKey) || 'null');
    return of(user); // Wrap in Observable
  }

  signUp(user: Omit<User, 'id' | 'points' | 'profilePhoto'>, profilePhoto?: File): Observable<User> {
    return this.convertFileToBase64(profilePhoto).pipe(
      map((profilePhotoBase64) => {
        const newUser: User = {
          ...user,
          points: 0,
          profilePhoto: profilePhotoBase64 || '',
          id: 0
        };
        return newUser;
      }),
      switchMap((newUser) => this.http.post<User>(`${this.apiUrl}/users`, newUser))
    );
  }

  private convertFileToBase64(file: File | undefined): Observable<string | undefined> {
    return new Observable<string | undefined>((observer) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => observer.next(reader.result as string);
        reader.onerror = (error) => observer.error(error);
        reader.onloadend = () => observer.complete();
      } else {
        observer.next(undefined)
        observer.complete()
      }
    })
  }
}

import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .get<User[]>(`/users?email=${credentials.email}&password=${credentials.password}`)
      .pipe(
        map((users) => {
          if (users.length === 1) {
            return users[0];
          }
          throw new Error('Invalid credentials');
        }),
        tap((user) => {
          console.log('Logged in user:', user);
          console.log('Is Collector:', user.isCollector);

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          if (user.isCollector) {
            this.router.navigate(['/collector']);
          } else {
            this.router.navigate(['/profile']);
          }
        })
      );
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/sign-in']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getUserDetails(): Observable<User | null> {
    const userId = this.currentUserSubject.value?.id;
    if (userId) {
      return this.http.get<User>(`/users/${userId}`).pipe(
        tap((user) => {

          this.updateCurrentUser(user);
        })
      );
    }
    return of(null);
  }

  signUp(user: Omit<User, 'id' | 'points' | 'profilePhoto'>, profilePhoto?: File): Observable<User> {
    return this.convertFileToBase64(profilePhoto).pipe(
      map((profilePhotoBase64) => ({
        ...user,
        totalPoints: 0,
        profilePhoto: profilePhotoBase64 || '',
      })),
      switchMap((newUser) => this.http.post<User>(`/users`, newUser))
    );
  }

  private convertFileToBase64(file: File | undefined): Observable<string | undefined> {
    return new Observable((observer) => {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => observer.next(reader.result as string);
        reader.onerror = (error) => observer.error(error);
        reader.onloadend = () => observer.complete();
      } else {
        observer.next(undefined);
        observer.complete();
      }
    });
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  ngOnInit(): void {
    if (this.currentUserSubject.value) {
      this.getUserDetails().subscribe();
    }
  }

  isCollector(): Observable<boolean> {
    return this.currentUser$.pipe(
      map(user => !!user?.isCollector)
    );
  }
}

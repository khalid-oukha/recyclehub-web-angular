import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {loadUserSuccess} from "../../store/user/user.actions";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(    private store: Store<AppState>,private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.get<User[]>(`/users?email=${credentials.email}&password=${credentials.password}`).pipe(
      map(users => {
        if (!users?.length) throw new Error('Invalid credentials');
        return users[0];
      }),
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.store.dispatch(loadUserSuccess({ user }));
        this.router.navigate([user.isCollector ? '/collector' : '/profile']);
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
        tap((user) => this.updateCurrentUser(user))
      );
    }
    return of(null);
  }

  signUp(user: Omit<User, 'id' | 'totalPoints' | 'profilePhoto'>, profilePhoto?: File): Observable<User> {
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

  isCollector(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => !!user?.isCollector));
  }
}

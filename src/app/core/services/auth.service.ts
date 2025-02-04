import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'users';
  private sessionKey = 'currentUser';

  constructor(private router: Router) {
  }

  private generateUserId(): number {
    const users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }

  async signUp(user: Omit<User, 'id' | 'points' | 'profilePhoto'>, profilePhoto?: File): Promise<boolean> {
    let users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');

    if (users.some((existingUser) => existingUser.email === user.email)) {
      return false;
    }

    let profilePhotoBase64: string | undefined;
    if (profilePhoto) {
      profilePhotoBase64 = await this.convertFileToBase64(profilePhoto);
    }

    const newUser: User = {
      ...user,
      id: this.generateUserId(),
      points: 0,
      profilePhoto: profilePhotoBase64 || '',
    };

    users.push(newUser);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  login(credentials: { email: string, password: string }): boolean {
    let users: User[] = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    let user = users.find((u) => u.email === credentials.email && u.password === credentials.password);

    if (user) {
      localStorage.setItem(this.sessionKey, JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
    this.router.navigate(['/auth/sign-in']).then(() => {
    });
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.sessionKey) !== null;
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem(this.sessionKey) || 'null');
  }
}

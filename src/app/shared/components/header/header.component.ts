import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isAuthenticated = false;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.currentUser$.pipe(
      tap(user => console.log('Current user:', user))
    ).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/sign-in']);
  }
}

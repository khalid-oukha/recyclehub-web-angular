import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-collector-header',
  templateUrl: './collector-header.component.html',
  styleUrl: './collector-header.component.scss'
})
export class CollectorHeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isAuthenticated = false;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authSubscription = this.authService.currentUser$
      .subscribe(user => {
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

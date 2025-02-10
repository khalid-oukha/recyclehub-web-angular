import { Component, OnInit } from '@angular/core';
import { CollectionRequest } from "../../../../models/DemandeCollecte";
import { CollectionRequestService } from "../../../../core/services/collection-request.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import {deleteUserRequest, loadUserRequest, updateUserRequest} from '../../../../store/user/user.actions';
import { selectCurrentUser, selectLoading } from '../../../../store/user/user.selectors';
import { AuthService } from "../../../../core/services/auth.service";
import { User } from "../../../../models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading$ = this.store.select(selectLoading);
  collectionRequests: CollectionRequest[] = [];
  isDeleting = false;
  defaultProfilePhoto = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
  currentUser!: User;
  user$ = this.store.select(selectCurrentUser);

  conversionOptions = [
    { points: 100, amount: 50 },
    { points: 200, amount: 120 },
    { points: 500, amount: 350 }
  ];
  selectedConversion: { points: number, amount: number } | null = null;
  conversionError = '';


  constructor(
    private store: Store<AppState>,
    private collectionRequestService: CollectionRequestService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe(user => {
      if (!user) {
        this.router.navigate(['/auth/sign-in']);
        return;
      }
      this.currentUser=user;
      this.store.dispatch(loadUserRequest({ userId: user.id }));
      this.fetchCollectionRequests(user.id);
    });

    this.user$.subscribe(user => {
      if (user) {
        this.fetchCollectionRequests(user.id);
      }
    });
  }

  fetchCollectionRequests(userId: string) {
    this.collectionRequestService.getByUserId(userId).subscribe({
      next: (requests) => {
        this.collectionRequests = requests;
      },
      error: (err) => console.error('Failed to load collection requests:', err)
    });
  }

  onDeleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.isDeleting = true;
      if (this.currentUser?.id) {
        this.store.dispatch(deleteUserRequest({ userId: this.currentUser.id }));
      } else {
        this.isDeleting = false;
      }
    }
  }

  selectConversion(option: { points: number, amount: number }): void {
    this.selectedConversion = option;
    this.conversionError = '';
  }

  convertPoints(): void {
    if (!this.selectedConversion || !this.currentUser?.totalPoints) {
      return;
    }

    if (this.currentUser.totalPoints < this.selectedConversion.points) {
      this.conversionError = 'Not enough points for this conversion';
      return;
    }

    const updatedUserData = {
      ...this.currentUser,
      totalPoints: this.currentUser.totalPoints - this.selectedConversion.points,
      convertedAmount: (this.currentUser.convertedAmount || 0) + this.selectedConversion.amount
    };

    this.store.dispatch(updateUserRequest({
      userId:this.currentUser?.id,
      updatedUserData
    }))
  }
}

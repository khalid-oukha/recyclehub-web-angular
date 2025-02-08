import { Component, OnInit } from '@angular/core';
import { CollectionRequest } from "../../../../models/DemandeCollecte";
import { CollectionRequestService } from "../../../../core/services/collection-request.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.state';
import { deleteUserRequest, loadUserRequest } from '../../../../store/user/user.actions';
import { selectCurrentUser, selectLoading } from '../../../../store/user/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = this.store.select(selectCurrentUser);
  isLoading$ = this.store.select(selectLoading);
  collectionRequests: CollectionRequest[] = [];
  isDeleting = false;
  defaultProfilePhoto = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

  constructor(
    private store: Store<AppState>,
    private collectionRequestService: CollectionRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Dispatch action to load user
    this.store.dispatch(loadUserRequest({ userId: 'currentUserId' })); // Replace with actual user ID

    // Subscribe to user changes to load collection requests
    this.user$.subscribe(user => {
      if (user) {
        this.fetchCollectionRequests(user.id);
      }
    });
  }

  fetchCollectionRequests(userId: string) {
    // Keep direct service call for collection requests
    this.collectionRequestService.getByUserId(userId).subscribe({
      next: (requests) => {
        this.collectionRequests = requests;
      }
    });
  }

  onDeleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.isDeleting = true;
      // Dispatch NgRx action for user deletion
      this.store.dispatch(deleteUserRequest());
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/User";
import {AuthService} from "../../../../core/services/auth.service";
import {CollectionRequest} from "../../../../models/DemandeCollecte";
import {CollectionRequestService} from "../../../../core/services/collection-request.service";
import {Router} from "@angular/router";
import {UserService} from "../../../../core/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  collectionRequests: CollectionRequest[] = [];
  isDeleting = false;
  defaultProfilePhoto = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

  constructor(
    private authService: AuthService,
    private collectionRequestService: CollectionRequestService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error fetching user details:", error);
        this.isLoading = false;
      }
    });
  }

  fetchCollectionRequests(userId: number) {
    this.collectionRequestService.getByUserId(userId).subscribe({
      next: (requests) => {
        this.collectionRequests = requests;
        console.log("user request", requests)
      },
      error: (error) => {
        console.error("Error fetching collection requests:", error);
        this.collectionRequests = [];
      }
    });
  }


  onDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.isDeleting = true;
      this.userService.deleteAccount().subscribe({
        next: () => console.log('Account deleted successfully'),
        error: (err) => {
          console.error(err);
          this.isDeleting = false;
        }
      });
    }
  }
}

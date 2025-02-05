import {Component, OnInit} from '@angular/core';
import {User} from "../../../../models/User";
import {AuthService} from "../../../../core/services/auth.service";
import {CollectionRequest} from "../../../../models/DemandeCollecte";
import {CollectionRequestService} from "../../../../core/services/collection-request.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  collectionRequests: CollectionRequest[] = [];

  constructor(private authService: AuthService, private collectionRequestService: CollectionRequestService) {
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
}

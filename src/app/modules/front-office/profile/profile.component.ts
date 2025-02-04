import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/User";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = true;

  constructor(private authService: AuthService) {
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
}

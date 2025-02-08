import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {UserService} from "../../../../core/services/user.service";
import {User} from "../../../../models/User";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  currentUser: User | null = null;
  isSubmitting = false;
  updateSuccess = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  private initializeForm(): void {
    this.editProfileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      phone: [''],
      birthday: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        postalCode: ['']
      })
    });
  }

  loadUserData(): void {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        if (user) {
          this.currentUser = user;
          const formValue = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            birthday: user.birthday ? new Date(user.birthday).toISOString().split('T')[0] : '',
            password: '',
            address: {
              street: user.address?.street || '',
              city: user.address?.city || '',
              postalCode: user.address?.postalCode || ''
            }
          };

          this.editProfileForm.patchValue(formValue);
        }
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      }
    });
  }

  onUpdateProfile(): void {
    if (!this.currentUser) {
      return;
    }

    this.isSubmitting = true;
    this.updateSuccess = false;

    const formValue = this.editProfileForm.value;

    const updatedUserData: Partial<User> = {
      ...this.currentUser,
      ...formValue,
      address: {
        street: formValue.address.street,
        city: formValue.address.city,
        postalCode: formValue.address.postalCode
      }
    };

    if (!formValue.password) {
      delete updatedUserData.password;
    }

    this.userService.updateUser(this.currentUser.id, updatedUserData).subscribe({
      next: (updatedUser) => {
        this.authService.updateCurrentUser(updatedUser);
        this.updateSuccess = true;
        this.isSubmitting = false;
      },
      error: (error) => {
        this.isSubmitting = false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../../models/User';
import { updateUserRequest } from '../../../../store/user/user.actions';
import { selectCurrentUser, selectLoading, selectError } from '../../../../store/user/user.selectors';
import {AppState} from "../../../../store/app.state";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  currentUser$: Observable<User | null>;
  isSubmitting$: Observable<boolean>;
  updateSuccess = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isSubmitting$ = this.store.select(selectLoading);
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
    this.currentUser$.subscribe((user) => {
      if (user) {
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
    });
  }

  onUpdateProfile(): void {
    this.updateSuccess = false;

    const formValue = this.editProfileForm.value;
    let updatedUserData: Partial<User> = {
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

    // Dispatch NgRx action to update user
    this.store.dispatch(updateUserRequest({
      userId: 'currentUserId', // Replace with actual user ID from store
      updatedUserData
    }));

    // Optional: Reset form after success
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user) {
        this.editProfileForm.patchValue({
          password: '' // Clear password field
        });
        this.updateSuccess = true;
      }
    });
  }
}

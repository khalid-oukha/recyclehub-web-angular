import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {Observable, take} from 'rxjs';
import { User } from '../../../../models/User';
import { UserService } from '../../../../core/services/user.service';
import { selectCurrentUser } from '../../../../store/user/user.selectors'; // Import the selector
import { AppState } from '../../../../store/app.state'; // Import the AppState
import { updateUserRequest } from '../../../../store/user/user.actions';
import {Router} from "@angular/router"; // Import the action

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;
  currentUser$: Observable<User | null>;
  isSubmitting = false;
  updateSuccess = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.currentUser$ = this.store.select(selectCurrentUser);
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
    this.isSubmitting = true;
    this.updateSuccess = false;

    this.currentUser$.pipe(take(1)).subscribe((user) => {
      if (!user) {
        this.isSubmitting = false;
        return;
      }

      const formValue = this.editProfileForm.value;

      const updatedUserData: Partial<User> = {
        ...user,
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

      this.store.dispatch(updateUserRequest({
        userId: user.id,
        updatedUserData
      }));
      this.router.navigate(['/profile'])
    });
  }}

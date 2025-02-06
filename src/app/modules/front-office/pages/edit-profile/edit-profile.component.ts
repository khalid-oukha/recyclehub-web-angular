import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  editProfileForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: [''],
      city: [''],
      postalCode: ['']
    });

    this.loadUserData();
  }

  loadUserData(): void {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phone: '+1234567890',
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001'
    };

    this.editProfileForm.patchValue(userData);
  }

  onUpdateProfile(): void {
    if (this.editProfileForm.valid) {
      console.log('Updated Profile Data:', this.editProfileForm.value);
      alert('Profile updated successfully!');
    }
  }

  onDeleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deleted');
      alert('Your account has been deleted.');
    }
  }
}

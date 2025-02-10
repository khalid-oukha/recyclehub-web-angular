import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signupForm: FormGroup;
  selectedFile: File | undefined;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      birthday: ['', Validators.required],
      isCollector: [false],
      profilePhoto: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    const formData = this.signupForm.value;
    const user = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      phone: formData.phone,
      birthday: formData.birthday,
      isCollector: formData.isCollector,
    };

    this.authService.signUp(user, this.selectedFile).subscribe(() => {
      this.router.navigate(['/auth/sign-in']);
    });
  }
}

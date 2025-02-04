import {Component} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;
    const credentials = {
      email: formData.email,
      password: formData.password
    };

    const success = this.authService.login(credentials);

    if (success) {
      this.router.navigate(['/']).then(r => true);
    } else {
      this.errorMessage = 'Invalid credentials, please try again.';
    }
  }
}

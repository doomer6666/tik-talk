import { routes } from '@/app/app.routes';
import { Auth } from '@/app/data/services/auth/auth';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(Auth);
  router = inject(Router);
  isPasswordVisible: boolean = false;
  isInvalidRequest = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (data) => {
          this.authService.saveTokens(data.access_token, data.refresh_token);
          this.router.navigate(['/search']);
        },
        error: () => (this.isInvalidRequest = true),
      });
    }
  }
}

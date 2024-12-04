import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container mx-auto mt-8 max-w-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            formControlName="username"
            class="w-full p-2 border rounded"
            [class.border-red-500]="loginForm.get('username')?.touched &&
                                   loginForm.get('username')?.invalid"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            formControlName="password"
            class="w-full p-2 border rounded"
            [class.border-red-500]="loginForm.get('password')?.touched &&
                                   loginForm.get('password')?.invalid"
          >
        </div>

        <button
          type="submit"
          [disabled]="loginForm.invalid"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600
                 disabled:bg-gray-400"
        >
          Login
        </button>

        @if (error) {
          <div class="text-red-500 text-sm mt-2">
            {{error}}
          </div>
        }
      </form>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err.error.message || 'Invalid credentials';
        }
      });
    }
  }
}

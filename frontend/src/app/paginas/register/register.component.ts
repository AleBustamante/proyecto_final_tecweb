import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="container mx-auto mt-8 max-w-md">
      <h2 class="text-2xl font-bold mb-4">Registrarse</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            formControlName="username"
            class="w-full p-2 border rounded"
            [class.border-red-500]="registerForm.get('username')?.touched &&
                                   registerForm.get('username')?.invalid"
          >
          @if (registerForm.get('username')?.touched &&
               registerForm.get('username')?.invalid) {
            <div class="text-red-500 text-sm mt-1">
              Username is required
            </div>
          }
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            formControlName="email"
            class="w-full p-2 border rounded"
            [class.border-red-500]="registerForm.get('email')?.touched &&
                                   registerForm.get('email')?.invalid"
          >
          @if (registerForm.get('email')?.touched &&
               registerForm.get('email')?.invalid) {
            <div class="text-red-500 text-sm mt-1">
              Valid email is required
            </div>
          }
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            formControlName="password"
            class="w-full p-2 border rounded"
            [class.border-red-500]="registerForm.get('password')?.touched &&
                                   registerForm.get('password')?.invalid"
          >
          @if (registerForm.get('password')?.touched &&
               registerForm.get('password')?.invalid) {
            <div class="text-red-500 text-sm mt-1">
              Password is required (minimum 6 characters)
            </div>
          }
        </div>

        <button
          type="submit"
          [disabled]="registerForm.invalid"
          class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600
                 disabled:bg-gray-400"
        >
          Register
        </button>

        @if (error) {
          <div class="text-red-500 text-sm mt-2">
            {{error}}
          </div>
        }
      </form>
    </div>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.error = err.error.message || 'Registration failed';
        }
      });
    }
  }
}

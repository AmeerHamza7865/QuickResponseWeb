import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  template: `
    <section class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Join QUICK RESPONSE SERVICE today</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="text" formControlName="name" class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="John Doe">
          </div>
          
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
            <input type="email" formControlName="email" class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="name@company.com">
          </div>

          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" formControlName="password" class="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="••••••••">
          </div>

          <div *ngIf="error" class="p-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-gray-800 dark:text-red-400">
            {{ error }}
          </div>

          <button type="submit" [disabled]="registerForm.invalid || loading" class="w-full py-3 px-5 text-white bg-blue-700 hover:bg-blue-800 rounded-lg font-medium transition-colors disabled:opacity-50">
            {{ loading ? 'Creating account...' : 'Sign Up' }}
          </button>

          <p class="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account? 
            <a routerLink="/login" class="text-blue-600 hover:underline font-medium">Login here</a>
          </p>
        </form>
      </div>
    </section>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        },
        error: (err) => {
          // Extract ASP.NET Identity error messages (array of {code, description})
          if (Array.isArray(err.error)) {
            this.error = err.error.map((e: any) => e.description).join(' ');
          } else {
            this.error = err.error?.message || err.error || 'Registration failed. Please try again.';
          }
          this.loading = false;
        }
      });
    }
  }
}

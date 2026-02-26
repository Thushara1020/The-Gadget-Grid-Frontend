import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service.user/userdata';

@Component({
  selector: 'app-createaccountcomponent',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './createaccountcomponent.html',
  styleUrl: './createaccountcomponent.css',
})
export class Createaccountcomponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);

      this.authService.registerUser(this.signUpForm.value).subscribe({
        next: (response) => {
          console.log(response);
          alert('Account created successfully');

          this.signUpForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          alert('Registration failed. Check if the backend is running.');
        },
      });
    } else {
      console.warn('Form is invalid');
      this.markAllAsTouched();
      alert('Please enter all information correctly.');
    }
  }

  private markAllAsTouched() {
    Object.values(this.signUpForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}

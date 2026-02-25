import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service.user/userdata';

@Component({
  selector: 'app-logincomponent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './logincomponent.html',
  styleUrl: './logincomponent.css',
})
export class Logincomponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onLogin(form: NgForm) {
    this.authService.getAllUsers().subscribe({
      next: (users: any[]) => {
        const validUser = users.find(
          (u) => u.username === this.loginData.username && u.password === this.loginData.password,
        );

        if (validUser) {
          console.log('Login Success! User matched:', validUser);

          if (validUser.user_id) {
            localStorage.setItem('userId', validUser.user_id.toString());
          }

          localStorage.setItem('userName', validUser.username);
          localStorage.setItem('isLoggedIn', 'true');

          this.router
            .navigate(['/'])
            .then((nav) => {
              console.log('Navigation Status:', nav);
              if (nav) {
                this.clearForm(form);
              }
            })
            .catch((err) => {
              console.error('Navigation Error:', err);
            });
        } else {
          alert('Username or Password incorrect!');
          this.clearForm(form);
        }
      },
      error: (err) => {
        console.error('Backend connection error:', err);
        alert('Server connection failed!');
      },
    });
  }

  clearForm(form: NgForm) {
    this.loginData = {
      username: '',
      password: '',
    };
    form.resetForm();
  }
}

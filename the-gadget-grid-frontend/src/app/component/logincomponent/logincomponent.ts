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
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    this.authService.getAllUsers().subscribe({
      next: (users: any[]) => {
        console.log('Database eke inna Usersla:', users);

        const validUser = users.find(u => 
          u.username === this.loginData.username && 
          u.password === this.loginData.password
        );

        if (validUser) {
          console.log('Success! User match una:', validUser);

          localStorage.setItem('userName', validUser.fullName); 
          localStorage.setItem('userId', validUser.userId.toString());
          localStorage.setItem('isLoggedIn', 'true');

          alert('Login Successful!');

          this.router.navigate(['/']).then(() => {
            window.location.reload(); 
          });

          this.clearForm(form);
        } else {
          console.error('Login Failed: Username ho Password incorrect');
          alert('Username or Password incorrect. Login failed!');
          this.clearForm(form);
        }
      },
      error: (err) => {
        console.error('Backend eken data ganna bari una:', err);
        alert('Backend error! Check your connection.');
      }
    });
  }

  clearForm(form: NgForm) {
    this.loginData = {
      username: '',
      password: ''
    };
    form.resetForm();
  }
}
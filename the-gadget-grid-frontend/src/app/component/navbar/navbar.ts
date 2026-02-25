import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  onLogout() {
    localStorage.removeItem('userId');
    
    alert('Logged out successfully!');
    this.router.navigate(['/login']);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  userName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userId') !== null;
  }

  onLogout() {
    localStorage.clear(); 
    alert('Logged out successfully!');
    
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
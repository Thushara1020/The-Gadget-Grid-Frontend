import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { Productservice } from '../../service.product/productservice'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  userName: string | null = '';
  cartItemCount: number = 0; 

  constructor(
    private router: Router,
    private productService: Productservice 
  ) {}

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    
    this.productService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  isLoggedIn(): boolean {
    const userId = localStorage.getItem('userId');
    console.log("User ID in Navbar:", userId);
    return userId !== null;
  }

  onLogout() {
    localStorage.clear(); 
    alert('Logged out successfully!');
    
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
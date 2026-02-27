import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Productservice } from '../../service.product/productservice'; 

@Component({
  selector: 'app-ordercomponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ordercomponent.html',
  styleUrl: './ordercomponent.css',
})
export class Ordercomponent implements OnInit {
  
  orders: any[] = []; 
  loading: boolean = true; 

  constructor(private productService: Productservice) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory() {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error("User ID not found in localStorage!");
      this.loading = false;
      alert("Please log in to view order history.");
      return;
    }

    console.log("Fetching orders for User ID from localStorage:", userId);

    this.productService.getOrdersByUserId(parseInt(userId)).subscribe({
      next: (data: any[]) => {
        this.orders = data;
        this.loading = false;
        console.log("Orders Loaded Successfully:", this.orders);
      },
      error: (err) => {
        console.error("Error loading orders:", err);
        this.loading = false;
        alert("Failed to load order history.");
      }
    });
  }
}
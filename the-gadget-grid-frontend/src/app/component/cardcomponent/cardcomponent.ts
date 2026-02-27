import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Productservice } from '../../service.product/productservice';

@Component({
  selector: 'app-cardcomponent',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './cardcomponent.html',
  styleUrl: './cardcomponent.css',
})
export class Cardcomponent implements OnInit {
  cartItems: any[] = [];

  constructor(private productService: Productservice) {}

  ngOnInit(): void {
    this.cartItems = this.productService.getCartItems();
  }

  getGrandTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.productService.updateCart(this.cartItems);
  }

  updateQuantity(index: number, change: number) {
    if (this.cartItems[index].quantity + change > 0) {
      this.cartItems[index].quantity += change;
      this.productService.updateCart(this.cartItems);
    }
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const bulkData = this.cartItems.map(item => ({
      user: { userId: parseInt(item.logedUserID) },
      product: { productId: item.addedProductID },
      quantity: item.quantity
    }));

    this.productService.addBulkToCart(bulkData).subscribe({
      next: (res) => {
        alert('Order Placed Successfully! 🛒');
        this.cartItems = [];
        this.productService.updateCart([]);
      },
      error: (err) => {
        console.error('Checkout Error:', err);
        alert('Order failed. Please try again.');
      }
    });
  }
}
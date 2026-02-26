import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product, Productservice } from '../../service.product/productservice';

@Component({
  selector: 'app-productcomponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productcomponent.html',
  styleUrl: './productcomponent.css',
})
export class Productcomponent implements OnInit {
  products: Product[] = [];
  
  addedProductsConsoleArray: any[] = []; 

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private productService: Productservice,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get displayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.products = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  addToCart(productId: number) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please login first to add products to your cart!');
      this.router.navigate(['/login']);
      return;
    }


    const cartItem = {
      userId: parseInt(userId),
      productId: productId,
      quantity: 1 
    };
    this.addedProductsConsoleArray.push({
      logedUserID: userId,
      addedProductID: productId,
      timestamp: new Date().toLocaleString()
    });

    console.log('--- Added Products Array for Console ---');
    console.log(this.addedProductsConsoleArray);

    this.productService.addToCart(cartItem).subscribe({
      next: (res) => {
        console.log('Added to cart successfully!', res);
        alert('Product added to your cart! 🛒');
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        alert('Could not add to cart. Try again later.');
      }
    });
  }

  trackByProductName(index: number, product: Product): string {
    return product.productName;
  }
}
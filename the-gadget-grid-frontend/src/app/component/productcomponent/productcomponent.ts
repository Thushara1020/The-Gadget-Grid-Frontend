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
    private router: Router,
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
      },
    });
  }

  addToCart(productId: number) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please login first!');
      this.router.navigate(['/login']);
      return;
    }

    const existingItem = this.addedProductsConsoleArray.find(
      (item) => item.addedProductID === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const selectedProduct = this.products.find((p) => p.productId === productId);

      this.addedProductsConsoleArray.push({
        logedUserID: userId,
        addedProductID: productId,
        productName: selectedProduct ? selectedProduct.productName : 'Unknown',
        price: selectedProduct ? selectedProduct.price : 0,
        quantity: 1,
      });
    }

    console.log('--- Current Cart Summary ---');
    console.table(this.addedProductsConsoleArray);

    const currentItem = this.addedProductsConsoleArray.find(
      (item) => item.addedProductID === productId,
    );

    const cartData = {
      userId: parseInt(userId),
      productId: productId,
      quantity: currentItem ? currentItem.quantity : 1,
    };

    this.productService.addToCart(cartData).subscribe({
      next: (res) => alert(`Product added! Current quantity: ${cartData.quantity} 🛒`),
      error: (err) => console.error('Cart Error:', err),
    });
  }

  trackByProductName(index: number, product: Product): string {
    return product.productName;
  }
}

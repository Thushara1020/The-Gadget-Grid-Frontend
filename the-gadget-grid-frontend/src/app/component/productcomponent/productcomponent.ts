import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(
    private productService: Productservice,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadProducts();
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

  trackByProductName(index: number, product: Product): string {
    return product.productName;
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common'; 
import { Product, Productservice } from '../../service.product/productservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productallcomponent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productallcomponent.html',
  styleUrl: './productallcomponent.css',
})
export class Productallcomponent implements OnInit {

  groupedData: { [category: string]: { [brand: string]: Product[] } } = {};
  categories: string[] = [];
  allProducts: Product[] = [];
  addedProductsConsoleArray: any[] = [];

  constructor(
    private productService: Productservice,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private scroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.loadAndGroupProducts();
    this.addedProductsConsoleArray = this.productService.getCartItems();

    this.scroller.setOffset([0, 60]); 
  }

  scrollToCategory(categoryId: string) {

    this.scroller.scrollToAnchor(categoryId);
  }

  loadAndGroupProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.allProducts = data;

        const groups = data.reduce((acc, product) => {
          const cat = product.category || 'General';
          const brand = product.productBrand || 'Other Brands';

          if (!acc[cat]) acc[cat] = {};
          if (!acc[cat][brand]) acc[cat][brand] = [];

          acc[cat][brand].push(product);
          return acc;
        }, {} as { [category: string]: { [brand: string]: Product[] } });

        this.groupedData = groups;
        this.categories = Object.keys(groups);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  getBrands(category: string): string[] {
    return Object.keys(this.groupedData[category]);
  }

  addToCart(productId: number) {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please login first!');
      this.router.navigate(['/login']);
      return;
    }

    const existingItem = this.addedProductsConsoleArray.find(
      (item) => item.addedProductID === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const selectedProduct = this.allProducts.find(p => p.productId === productId);

      this.addedProductsConsoleArray.push({
        logedUserID: userId,
        addedProductID: productId,
        productName: selectedProduct ? selectedProduct.productName : 'Unknown',
        price: selectedProduct ? selectedProduct.price : 0,
        quantity: 1,
      });
    }

    this.productService.updateCart(this.addedProductsConsoleArray);
    alert('Added to cart! 🛒');
  }

getProductCount(category: string): number {
  const brandsInCat = this.groupedData[category];
  let count = 0;
  for (const brand in brandsInCat) {
    count += brandsInCat[brand].length;
  }
  return count;
}
}
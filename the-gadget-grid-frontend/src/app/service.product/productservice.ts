import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  productId: number;
  productName: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  productBrand: string;
}

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  private apiUrl = 'http://localhost:8080/api/products/all';
  
  cartDataList: any[] = []; 

  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable(); 

  constructor(private http: HttpClient) {
    this.loadCartFromLocalStorage();
  }

  private updateCartCount() {

    const totalItems = this.cartDataList.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.cartItemCountSubject.next(totalItems);
    

    localStorage.setItem('cartItems', JSON.stringify(this.cartDataList));
  }


  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartDataList = JSON.parse(savedCart);
      this.updateCartCount();
    }
  }


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  login(loginData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/register', loginData);
  }

  addToCart(cartData: any): Observable<any> {
    this.cartDataList.push(cartData);
    this.updateCartCount();

    return this.http.post('http://localhost:8080/api/cart/add', cartData);
  }

  addBulkToCart(cartItems: any[]): Observable<any> {
    this.cartDataList.push(...cartItems);
    this.updateCartCount();

    return this.http.post('http://localhost:8080/api/cart/add-bulk', cartItems);
  }


  updateCart(data: any[]) {
    this.cartDataList = data;
    this.updateCartCount();
  }

  getCartItems() {
    return this.cartDataList;
  }
  
  placeOrder(orderData: any): Observable<any> {
    this.updateCart([]); 
    return this.http.post('http://localhost:8080/api/orders/place', orderData);
  }

  getOrdersByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/orders/user/${userId}`);
  }
}
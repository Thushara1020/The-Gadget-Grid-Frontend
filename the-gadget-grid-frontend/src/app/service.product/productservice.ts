import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  login(loginData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/users/register', loginData);
  }

  addToCart(cartData: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/cart/add', cartData);
  }

  addBulkToCart(cartItems: any[]): Observable<any> {
    return this.http.post('http://localhost:8080/api/cart/add-bulk', cartItems);
  }


  updateCart(data: any[]) {
    this.cartDataList = data;
  }

  getCartItems() {
    return this.cartDataList;
  }
  placeOrder(orderData: any): Observable<any> {
  return this.http.post('http://localhost:8080/api/orders/place', orderData);
}
// Productservice.ts එකේ
getOrdersByUserId(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/orders/user/${userId}`);
}
}
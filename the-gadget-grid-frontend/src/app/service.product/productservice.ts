import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
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

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  login(loginData: any): Observable<any> {
  return this.http.post('http://localhost:8080/api/users/register', loginData);
}
}
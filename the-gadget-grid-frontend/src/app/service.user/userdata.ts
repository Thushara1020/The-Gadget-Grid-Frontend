import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Backend එකේ තියෙන URLs දෙක
  private getAllUsersUrl = 'http://localhost:8080/api/users/all'; 
  private registerUrl = 'http://localhost:8080/api/users/register'; // 👈 අලුත් URL එක

  constructor(private http: HttpClient) { }

  // Login වලදී පාවිච්චි කරන්න
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.getAllUsersUrl);
  }

  // Register (Sign Up) වලදී පාවිච්චි කරන්න 👈
  registerUser(userData: any): Observable<any> {
    // Backend එකට දත්ත POST කරනවා
    return this.http.post(this.registerUrl, userData);
  }
}
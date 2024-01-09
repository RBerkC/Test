// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DataService } from './shared/data.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7292/api/Registration';
  logindata : LoginComponent

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {}

  register(data: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post<any>(`${this.apiUrl}/registration`, data, { headers, observe: 'response' })
    .pipe(
      catchError((error: any) => {
        //if (error instanceof HttpResponse) {
          // Check the status code here
          if (error.status === 200) {
            console.log('Registration successful');
            // You can return a custom success response if needed
            this.router.navigate(['/login']);
            return new Observable<any>(() => {});
          } else {
            console.error('Registration failed with status:', error.status);
          }
        //}
        return throwError('Registration failed');
      })
    );
}


login(data: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post<any>(`${this.apiUrl}/login`, data, { headers, observe: 'response' })
    .pipe(
      catchError((error: any) => {
        //if (error instanceof HttpResponse) {
          if (error.status === 200) {
            console.log('Login successful');
            // Navigate to the welcome page after successful login
            this.dataService.setEmail(data.email);
            this.router.navigate(['/welcome/']);
            // You can return a custom success response if needed
            return new Observable<any>(() => {});
          } else {
            console.error('Login failed with status:', error.status);
          }
        //}
        return throwError('Login failed');
      })
    );
}

}

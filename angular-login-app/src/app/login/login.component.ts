// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('Email:', this.loginData.email);
    console.log('Password:', this.loginData.password);
  
    if (!this.loginData.email || !this.loginData.password) {
      console.error('Please enter both email and password.');
      return;
    }
  
  
  

    this.authService.login(this.loginData).subscribe(
      (response) => {
        console.log('Login response:', response);
    
        if (response && response.status === 200) {
          console.log('Login successful');
          // Check the response body for "Valid User"
          if (response.body === 'Valid User') {
            console.log('Valid User');
            // Navigate to the new page after successful login
            this.router.navigate(['/welcome', this.loginData.email]);
          } else {
            console.error('Unexpected response body:', response.body);
          }
        } else {
          console.error('Unexpected status code:', response.status);
          // Handle unexpected status code here
        }
      },
      (error) => {
        console.error(error);
        // Handle login error (e.g., display an error message)
      }
    );
    
  }
}

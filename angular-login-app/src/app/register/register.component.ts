// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.registerData.email || !this.registerData.password) {
      console.error('Please enter both username and password.');
      return;
    }
  
    this.authService.register(this.registerData).subscribe(
      () => {
        console.log('Registration successful');
        // Navigate to the login page after successful registration
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
        // this.router.navigate(['/login']);
        // Handle registration error (e.g., display an error message)
      }
    );
  }
}  

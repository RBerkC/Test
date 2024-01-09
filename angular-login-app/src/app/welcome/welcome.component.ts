// welcome.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  email: string = '';

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    // Retrieve the email from the service
    this.dataService.currentEmail.subscribe((email) => {
      this.email = email;
    });
  }
}

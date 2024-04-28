import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  username: string = '';
  password: string = '';

  constructor() { }

  login() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

}

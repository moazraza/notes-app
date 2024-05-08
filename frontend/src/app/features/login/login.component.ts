import { Component } from '@angular/core';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public isCaptchaValidated: boolean = false; //for self loading
  username: string = '';
  password: string = '';
  coreService: any;

  constructor(private reCaptchaV3Service: RecaptchaModule) { 
    // Assign reCaptchaV3Service to coreService
    this.coreService = reCaptchaV3Service;
  }

  login() {
    // Implement your login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  onCaptchaResponse(event: any){
    if (event) {
      if (this.coreService && this.coreService.onCaptchaResponse) {
        this.coreService.onCaptchaResponse({ secret: '6Leh7NQpAAAAANu4NW8dSfODtPt_o0sh8JJjSMwh', response: event.response })
          .then((response: { success: any; }) => {
            if (response && response.success) {
              // Handle successful captcha response
              
            }
          })
          .catch((error: any) => {
            // Handle error
            console.error('Error processing captcha response:', error);
          });
      } else {
        console.error('coreService or onCaptchaResponse method not available');
      }
    }
  }

}

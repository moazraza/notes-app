import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../core/auth/service/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        FormsModule
    ],
    providers: [AuthService],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    username: string = '';
    password: string = '';
    email: string = '';
    name: string = '';

    constructor(private authService: AuthService, private router: Router) {
    }

    login() {
        // Implement your login logic here
        console.log('Username:', this.username);
        console.log('Password:', this.password);
    }

    register() {
        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('password', this.password);
        formData.append('email', this.email);
        formData.append('full_name', this.name);
        this.authService.register(formData).subscribe({
            next: (data) => {
                console.log('data is:', data);
                this.router.navigate(['/home']);
            },
            error: (error) => {
                console.error('error fetching posts: ', error);
            }
        });
    }
}

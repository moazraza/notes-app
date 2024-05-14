import {Component} from '@angular/core';
import {AuthService} from "../../../core/auth/service/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        HttpClientModule,
        FormsModule,
        RouterLink,
        RouterLinkActive
    ],
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    username: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) {

    }

    doLogin() {
        // Implement your login logic here
        console.log('Username:', this.username);
        console.log('Password:', this.password);

        this.authService.login(this.username, this.password).subscribe({
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

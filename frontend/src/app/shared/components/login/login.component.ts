import {Component} from '@angular/core';
import {AuthService} from "../../../core/auth/service/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        HttpClientModule,
        FormsModule,
        RouterLink,
        RouterLinkActive,
        NgIf
    ],
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    error = false;

    constructor(private authService: AuthService, private router: Router) {

    }

    doLogin() {
        this.authService.login(this.username, this.password).subscribe({
            next: (data) => {
                console.log('data is:', data);
                this.router.navigate(['/home']);
            },
            error: (error) => {
                this.error = true;
                console.error('error fetching posts: ', error);
            }
        });
    }

}

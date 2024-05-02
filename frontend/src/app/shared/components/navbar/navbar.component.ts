import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../core/auth/service/auth.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        NgOptimizedImage
    ],
    providers: [AuthService],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    showSearchBar = false;

    toggleSearchBar(): void {
        this.showSearchBar = !this.showSearchBar;
    }

    constructor(private router: Router, private authService: AuthService) {
    }

    navigateToSearchPage() {
        // Navigate to the search page
        this.router.navigateByUrl('/search');
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }


}

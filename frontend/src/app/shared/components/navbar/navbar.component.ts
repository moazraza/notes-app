import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../core/auth/service/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchService} from "../../../services/search.service";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        NgOptimizedImage,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [AuthService, SearchService],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    showSearchBar = false;
    searchQuery: string = ''

    toggleSearchBar(): void {
        this.showSearchBar = !this.showSearchBar;
    }

    constructor(private router: Router, private authService: AuthService, protected searchService: SearchService) {
    }

    navigateToSearchPage() {
        // Navigate to the search page
        console.log("Search query is:" + this.searchQuery);
        console.log('Navigating to search page');
        this.searchService.setQuery(this.searchQuery);
        console.log('Query is:', this.searchService.getQuery());
        this.router.navigate(['/search'], {queryParams: {q: this.searchQuery}});
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }


}

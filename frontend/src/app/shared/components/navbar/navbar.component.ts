import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        NgOptimizedImage
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    showSearchBar = false;

  toggleSearchBar(): void {
    this.showSearchBar = !this.showSearchBar;
  }
  constructor(private router: Router) {}

    navigateToSearchPage() {
        // Navigate to the search page
        this.router.navigateByUrl('/search');
    }


}

import {Injectable, Injector} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    private authService: AuthService | undefined;

    constructor(
        private router: Router,
        private injector: Injector
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.authService = this.injector.get(AuthService);
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            return true;
        } else {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }
    }
}

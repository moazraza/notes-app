import {
    provideRouter,
    Routes,
    withComponentInputBinding,
} from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ApplicationConfig } from '@angular/core';
import { SearchComponent } from './features/search/search.component';
import {LoginComponent} from "./shared/components/login/login.component";
import {RegisterComponent} from "./shared/components/register/register.component";
import {BookmarksComponent} from "./features/bookmarks/bookmarks.component";
import {AuthGuard} from "./core/auth/guard/auth.guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'bookmarks',
        component: BookmarksComponent
    }
];

/*export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding())],
};*/

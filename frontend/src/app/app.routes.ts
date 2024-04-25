import {
    provideRouter,
    Routes,
    withComponentInputBinding,
} from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ApplicationConfig } from '@angular/core';
import { LoginComponent } from './features/login/login.component';
import { SignupComponent } from './features/signup/signup.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding())],
};

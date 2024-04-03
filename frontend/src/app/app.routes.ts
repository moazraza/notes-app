import {provideRouter, Routes, withComponentInputBinding} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {ProfileComponent} from "./features/profile/profile.component";
import {ApplicationConfig} from "@angular/core";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes, withComponentInputBinding())]
};

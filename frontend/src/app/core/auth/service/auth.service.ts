import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        const user = localStorage.getItem('user');
        this.currentUserSubject = new BehaviorSubject<any>(user ? JSON.parse(user) : null);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>('http://127.0.0.1:5000/login', {username, password})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.token);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(formData: FormData) {
        return this.http.post<any>('http://127.0.0.1:5000/register', formData)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', user.token);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    isLoggedIn() {
        return this.currentUserValue !== null;
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
    }
}

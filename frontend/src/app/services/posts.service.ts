import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private apiUrl = 'http://127.0.0.1:5000/get_post';

    constructor(private http: HttpClient) {
    }

    getPosts(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}

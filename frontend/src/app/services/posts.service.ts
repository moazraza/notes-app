import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private getAllUrl = 'http://127.0.0.1:5000/get_post';
    private addUrl = 'http://127.0.0.1:5000/posts/create';
    private imageUrl = 'http://127.0.0.1:5000/post_images';

    constructor(private http: HttpClient) {
    }

    getPosts(): Observable<any> {
        return this.http.get<any>(this.getAllUrl);
    }

    addPost(formData: FormData): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', '' + localStorage.getItem('token'));
        return this.http.post<any>(
            this.addUrl,
            formData,
            {headers}
        );
    }

    uploadImage(formData: FormData): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post<any>(
            this.imageUrl,
            formData,
            {headers}
        );
    }
}

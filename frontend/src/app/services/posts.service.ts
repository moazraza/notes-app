import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private getAllUrl = 'http://127.0.0.1:5000/get_post';
    private getPostUrl = 'http://127.0.0.1:5000/post';
    private addUrl = 'http://127.0.0.1:5000/posts/create';
    private imageUrl = 'http://127.0.0.1:5000/post_images';
    private userPosts = 'http://127.0.0.1:5000/user'

    constructor(private http: HttpClient) {
    }

    getPosts(): Observable<any> {
        return this.http.get<any>(this.getAllUrl);
    }

    getPost(id: string): Observable<any> {
        console.log('getting post: ' + id)
        const headers = new HttpHeaders()
            .set('Authorization', '' + localStorage.getItem('token'));
        return this.http.get<any>(this.getPostUrl + '/' + id, {headers});
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

    getPostsByUser(): Observable<any> {
        const user = localStorage.getItem('user');
        const username = user ? JSON.parse(user).username : '';
        const url = this.userPosts + '/' + username + '/posts';
        const headers = new HttpHeaders()
            .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<any>(
            url,
            {headers}
        );
    }
}

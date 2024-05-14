import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {PostsService} from "../../services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "../../core/auth/service/auth.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        NgForOf,
        PostCardComponent,
        NgIf,
        HttpClientModule
    ],
    providers: [PostsService, AuthService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    posts: any[] = [];


    constructor(private postsService: PostsService, private authService: AuthService, private router: Router) {
        this.postsService.getPosts().subscribe({
            next: (data) => {
                if (data) {
                    data.forEach((post: any) => {
                        if (post.images) {
                            post.post_image = post.images[0];
                        }
                    });
                }
                this.posts = data;
                console.log('data is:', this.posts);
            },
            error: (error) => {
                console.error('error fetching posts: ', error);
            }
        });
    }

    ngOnInit(): void {
        if (!this.authService.currentUserValue) {
            this.authService.logout();
            this.router.navigate(['/login']);
        }
    }


}

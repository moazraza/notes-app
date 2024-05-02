import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {PostsService} from "../../services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-bookmarks',
    standalone: true,
    imports: [
        NgForOf,
        PostCardComponent,
        NgIf,
        HttpClientModule,
        RouterLink,
        RouterLinkActive
    ],
    providers: [PostsService],
    templateUrl: './bookmarks.component.html',
    styleUrl: './bookmarks.component.css'
})
export class BookmarksComponent {
    posts: any[] = [];

    constructor(private postsService: PostsService) {
        this.postsService.getPosts().subscribe({
            next: (data) => {
                this.posts = data;
                console.log('data is:', this.posts);
            },
            error: (error) => {
                console.error('error fetching posts: ', error);
            }
        });
    }

}

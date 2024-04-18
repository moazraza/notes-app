import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {PostsService} from "../../services/posts.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        NgForOf,
        PostCardComponent,
        NgIf,
        HttpClientModule
    ],
    providers: [PostsService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

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

    ngOnInit(): void {

    }


}

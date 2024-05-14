import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-search',
    standalone: true,

    imports: [
        NgForOf,
        PostCardComponent,
        NgIf
    ],
    providers: [SearchService],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {

    results: any[] = [];

    constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {
        const queryParam = this.activatedRoute.snapshot.queryParams['q'];
        console.log('Query param is:', queryParam);
        this.searchService.search(queryParam).subscribe({
            next: (data) => {
                if (data) {
                    data.forEach((post: any) => {
                        if (post.images) {
                            post.post_image = post.images[0];
                        }
                    });
                }
                this.results = data;
                console.log('data is:', this.results);
            },
            error: (error) => {
                console.error('error fetching posts: ', error);
            }
        });
    }
}

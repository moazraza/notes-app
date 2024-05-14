import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {SearchService} from "../../services/search.service";
import {ActivatedRoute} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'app-search',
    standalone: true,

    imports: [
        NgForOf,
        PostCardComponent,
        NgIf,
        MatProgressSpinner
    ],
    providers: [SearchService],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css'
})
export class SearchComponent {

    results: any[] = [];
    found: any;
    loading: boolean = false;

    constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {
        /*const queryParam = this.activatedRoute.snapshot.queryParams['q'];
        console.log('Query param is:', queryParam);*/
        this.activatedRoute.queryParams.subscribe(params => {
            const queryParam = params['q'];
            console.log('Query param is:', queryParam);
            if (queryParam) {
                this.loading = true;
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
                        this.found = true;
                        this.loading = false;
                        console.log('data is:', this.results);
                    },
                    error: (error) => {
                        this.found = false;
                        this.loading = false;
                        console.error('error fetching posts: ', error);
                    }
                });
            }
        });
    }
}

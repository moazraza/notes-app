import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {PostsService} from "../../../services/posts.service";

@Component({
    selector: 'app-post-card',
    standalone: true,
    imports: [
        NgIf,
        NgForOf
    ],
    templateUrl: './post-card.component.html',
    styleUrl: './post-card.component.css'
})
export class PostCardComponent {
    @Input() post: any;
    post_image: any;

    constructor(private sanitizer: DomSanitizer, private postsService: PostsService) {

    }

    getImageURL(base64Image: string) {
        return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64Image);
    }

    openModal() {
        console.log('opening modal for post: ', this.post.id);
        this.postsService.getPost(this.post.id).subscribe({
            next: (data) => {
                if (data && data.images) {
                    data.images.forEach((post: any) => {
                        if (post) {
                            data.post_image = post;
                        }
                    });
                }
                console.log('data is:', data);
                this.post = data;
                const modalDiv = document.getElementById('postModal')
                if (modalDiv != null) {
                    modalDiv.style.display = 'block'
                }
            },
            error: (error) => {
                console.error('error fetching posts: ', error);
            }

        });
    }

    closeModal() {
        const modalDiv = document.getElementById('postModal')
        if (modalDiv != null) {
            modalDiv.style.display = 'none'
        }
    }

}

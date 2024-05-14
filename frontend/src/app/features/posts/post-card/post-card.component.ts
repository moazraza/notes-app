import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";

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

    constructor(private sanitizer: DomSanitizer) {

    }

    getImageURL(base64Image: string) {
        return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + base64Image);
    }

    openModal() {
        console.log('herein the function');

        const modalDiv = document.getElementById('postModal')
        if (modalDiv != null) {
            modalDiv.style.display = 'block'
        }
    }

    closeModal() {
        const modalDiv = document.getElementById('postModal')
        if (modalDiv != null) {
            modalDiv.style.display = 'none'
        }
    }

}

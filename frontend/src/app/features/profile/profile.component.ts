import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PostCardComponent } from '../posts/post-card/post-card.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [NgForOf, PostCardComponent, NgIf],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
})
export class ProfileComponent {
    openModal() {
        console.log('herein the function');

        const modalDiv = document.getElementById('addModal');
        if (modalDiv != null) {
            modalDiv.style.display = 'block';
        }
    }

    closeModal() {
        const modalDiv = document.getElementById('addModal');
        if (modalDiv != null) {
            modalDiv.style.display = 'none';
        }
    }

    posts = [
        {
            title: 'Post 1',
            content:
                'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.',
        },
        {
            title: 'Post 2',
            content:
                'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.',
        },
        {
            title: 'Post 3',
            content:
                'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.',
        },
        {
            title: 'Post 4',
            content:
                'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.',
        },
        {
            title: 'Post 5',
            content:
                'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.',
        },
        {
            title: 'Post 5',
            content:
                'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.',
        },
    ];
}

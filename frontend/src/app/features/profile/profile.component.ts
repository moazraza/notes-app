import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {PostsService} from "../../services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        NgForOf,
        PostCardComponent,
        NgIf,
        HttpClientModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        FormsModule
    ],
    providers: [PostsService],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {
    posts: any[] = [
        {'title': '1234', 'content': '677'},
        {'title': '1234', 'content': '677'},
        {'title': '1234', 'content': '677'},
        {'title': '1234', 'content': '677'},
        {'title': '1234', 'content': '677'},
        {'title': '1234', 'content': '677'},
        {'title': '1234', 'content': '677'},
        {'title': '1234', 'content': '677'}
    ];
    postTitle: any;
    postDescription: any;
    files: File[] = [];
    fileChosenText: string = 'No file chosen';

    constructor(private postsService: PostsService) {
    }

    openModal() {
        console.log('herein the function');

        const modalDiv = document.getElementById('addModal');
        if (modalDiv != null) {
            modalDiv.style.display = 'block';
        }
    }

    closeModal(event: MouseEvent, isCancel: boolean = true) {
        if (isCancel || (event.target as HTMLElement).id === 'addModal') {
            const modalDiv = document.getElementById('addModal');
            if (modalDiv != null) {
                modalDiv.style.display = 'none';
            }
        }
    }

    onFileSelected(event: any): void {
        const selectedFiles = event.target.files;
        this.files.push(...selectedFiles); // Handle multiple files
        // @ts-ignore
        document.getElementById('file-chosen').innerText = `${this.files.length} files chosen`;
        this.fileChosenText = `${this.files.length} file(s) chosen`;
    }

    submitAndCloseModal() {
        console.log('uploading images')
        let formData = new FormData();
        formData.append('title', this.postTitle);
        formData.append('content', this.postDescription);
        this.files.forEach(file => {
            formData.append('files', file);
        });
        const regex = /(#\w+)/g;
        const tags = this.postDescription.match(regex);
        if (tags) {
            tags.forEach((tag: string) => {
                formData.append('tags', tag);
            });
        }

        console.log('form data is:', formData);
        this.postsService.addPost(formData).subscribe({
            next: (data) => {
                console.log('data is:', data);
                this.posts.push(data);
                const modalDiv = document.getElementById('addModal');
                if (modalDiv != null) {
                    modalDiv.style.display = 'none';
                }
            },
            error: (error) => {
                console.error('error fetching posts: ', error);
            }

        });
    }
}

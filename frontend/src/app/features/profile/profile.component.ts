import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {PostsService} from "../../services/posts.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

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
        RouterOutlet
    ],
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
}

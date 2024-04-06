import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        NgForOf,
        PostCardComponent,
        NgIf
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    posts = [
        {title: 'Post 1', content: 'Content 1'},
        {title: 'Post 2', content: 'Content 2'},
        {title: 'Post 3', content: 'Content 3'},
        {title: 'Post 4', content: 'Content 4'},
        {title: 'Post 5', content: 'Content 5'},
        {title: 'Post 6', content: 'Content 6'},
    ];


}

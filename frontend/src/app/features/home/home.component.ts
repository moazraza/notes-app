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
        {title: 'Post 1', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 2', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 3', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 4', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 5', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 6', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 1', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 2', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 3', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
        {title: 'Post 4', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
    ];


}

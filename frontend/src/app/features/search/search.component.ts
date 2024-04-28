import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";

@Component({
  selector: 'app-search',
  standalone: true,

    imports: [
      NgForOf,
      PostCardComponent,
      NgIf
  ],

  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResults = [
    {title: 'Post 1', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
    {title: 'Post 2', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
    {title: 'Post 3', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
    {title: 'Post 4', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},
    {title: 'Post 5', content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Vulputate ut laoreet velit ma.'},];
}

import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostCardComponent} from "../posts/post-card/post-card.component";
import {PostsService} from "../../services/posts.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [       
      NgForOf,
      PostCardComponent,
      NgIf,
      HttpClientModule],
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

}

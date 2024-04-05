import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    users = [
        {name: 'John', age: 25},
        {name: 'Jane', age: 22},
        {name: 'Jack', age: 30},
        {name: 'Jill', age: 26},
        {name: 'James', age: 27},
        {name: 'Jenny', age: 28},
        {name: 'Joe', age: 24},
        {name: 'Judy', age: 23},
        {name: 'Jerry', age: 29},
        {name: 'Jessica', age: 21},
        {name: 'Jeff', age: 31},
        {name: 'Jasmine', age: 32},
        {name: 'Josh', age: 33},
        {name: 'Jocelyn', age: 34},
        {name: 'Jesse', age: 35},
        {name: 'Jared', age: 36},
        {name: 'Jill', age: 26},
        {name: 'James', age: 27},
        {name: 'Jenny', age: 28},
        {name: 'Joe', age: 24},
        {name: 'Judy', age: 23},
        {name: 'Jerry', age: 29},
        {name: 'Jessica', age: 21},
        {name: 'John', age: 25},
        {name: 'Jane', age: 22},
        {name: 'Jack', age: 30},
        {name: 'Jill', age: 26},
        {name: 'James', age: 27},
        {name: 'Jenny', age: 28},
        {name: 'Joe', age: 24},
        {name: 'Judy', age: 23},
        {name: 'Jerry', age: 29},
        {name: 'Jessica', age: 21},
        {name: 'Jeff', age: 31},
        {name: 'Jasmine', age: 32},
        {name: 'Josh', age: 33},
        {name: 'Jocelyn', age: 34},
        {name: 'Jesse', age: 35},
        {name: 'Jared', age: 36},
        {name: 'Jill', age: 26},
        {name: 'James', age: 27},
        {name: 'Jenny', age: 28},
        {name: 'Joe', age: 24},
        {name: 'Judy', age: 23},
        {name: 'Jerry', age: 29},
        {name: 'Jessica', age: 21}
    ];


}

import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-post-card',
    standalone: true,
    imports: [],
    templateUrl: './post-card.component.html',
    styleUrl: './post-card.component.css'
})
export class PostCardComponent {
    @Input() post: any;

    openModal(){
        console.log('herein the function');

        const modalDiv = document.getElementById('postModal')
        if(modalDiv != null){
            modalDiv.style.display = 'block'
        }
    }

    closeModal(){
        const modalDiv = document.getElementById('postModal')
        if(modalDiv != null){
            modalDiv.style.display = 'none'
        }
    }

}

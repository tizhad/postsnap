import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { COVER_IMAGES } from '../../consts/constants';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [],
  templateUrl: './post-item.component.html',
  styleUrl: './post-item.component.scss',
})
export class PostItemComponent {
  @Input() post!: Post;
  @Input()
  currentProperty!: string | number;
  coverImage: string = '';

  constructor() {
    this.coverImage = this.getRandomCoverImage();
  }

  getRandomCoverImage(): string {
    const randomIndex = Math.floor(Math.random() * COVER_IMAGES.length);
    return COVER_IMAGES[randomIndex];
  }
}

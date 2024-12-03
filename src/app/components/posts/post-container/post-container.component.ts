import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from '../post-item/post-item.component';
import { LoaderComponent } from '../../../loader/loader.component';
import { Post } from '../../../models/post.model';
import { ActivePostStore, PostsStore } from '../../../store/posts.store';

@Component({
  selector: 'app-post-container',
  standalone: true,
  imports: [CommonModule, LoaderComponent, PostItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent {
  readonly postsStore = inject(PostsStore);
  readonly activePostStore = inject(ActivePostStore);

  activePostId?: number;

  constructor() {
    this.postsStore.loadPosts();
  }

  onPostClick(post: Post): void {
    if (!post) return;
    this.activePostStore.setActivePost(post);
    this.activePostId = post.id;
  }

  getPropertyForPost(post: Post): string | number {
    const activePost = this.activePostStore.post?.();
    const activeIndexValue = this.activePostStore.activeIndexValue?.();

    if (activePost?.id === post.id) {
      return activeIndexValue ?? post.title;
    }

    return post.title;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
export class PostContainerComponent implements OnInit, OnDestroy {
  readonly postsStore = inject(PostsStore);
  readonly activePostStore = inject(ActivePostStore);

  activePostId?: number;

  ngOnInit(): void {
    this.postsStore.loadPosts();
  }

  ngOnDestroy(): void {
    this.activePostStore.resetActivePost();
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

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { ActivePostState, Post } from '../models/post.model';
import { PostsApiService } from '../services/posts/posts-api.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { PostItemComponent } from './post-item/post-item.component';

@Component({
  selector: 'app-post-container',
  standalone: true,
  imports: [CommonModule, LoaderComponent, PostItemComponent],
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss'],
})
export class PostContainerComponent implements OnInit {
  posts = signal<Post[]>([]);
  activePost = signal<ActivePostState>({
    post: undefined,
    activeKeyIndex: 1,
  });
  loading = signal<boolean>(false);
  errorMessage?: string;
  allProperties: (keyof Post)[] = ['title', 'id', 'body', 'userId'];

  activePostId?: number;

  constructor(private postsApiService: PostsApiService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading.set(true);
    this.postsApiService.getPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading.set(false);
      },
    });
  }

  onPostClick(postId: number): void {
    if (!postId) return;
    this.activePostId = postId;

    const clickedPost = this.posts().find((post) => post.id === postId);
    if (!clickedPost) return;
    const currentState = this.activePost();

    const nextKeyIndex =
      (currentState.activeKeyIndex + 1) % this.allProperties.length;
    this.activePost.set({
      post: clickedPost,
      activeKeyIndex: nextKeyIndex,
    });
  }

  getPropertyForPost(post: Post): string | number {
    const currentState = this.activePost();
    if (currentState?.post?.id === post.id) {
      return post[
        this.allProperties[currentState.activeKeyIndex] as keyof Post
      ];
    }
    return post.title;
  }
}

import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Post } from '../models/post.model';
import { PostsApiService } from '../services/posts/posts-api.service';
import { catchError, tap, from, of } from 'rxjs';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
};

const initialPostsState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

type ActivePostState = {
  post?: Post;
  activeKeyIndex: number;
  activeIndexValue?: number | string;
};

const initialActivePostState: ActivePostState = {
  post: undefined,
  activeKeyIndex: 0,
  activeIndexValue: undefined,
};

const ALL_PROPERTIES: (keyof Post)[] = ['title', 'id', 'body', 'userId'];

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialPostsState),
  withMethods((store, postsApiService = inject(PostsApiService)) => ({
    loadPosts() {
      patchState(store, {
        isLoading: true,
        error: null,
      });
      postsApiService
        .getPosts()
        .pipe(
          tap({
            next: (posts) => {
              patchState(store, {
                posts,
                isLoading: false,
              });
            },
            error: (error) => {
              console.error('Error loading posts:', error);
              patchState(store, {
                isLoading: false,
                error: error.message || 'Failed to load posts',
              });
            },
          }),
          catchError((error) => {
            return of([]);
          })
        )
        .subscribe();
    },
  }))
);

export const ActivePostStore = signalStore(
  { providedIn: 'root' },
  withState(initialActivePostState),
  withMethods((store) => ({
    setActivePost(post: Post): void {
      const activePost = store.post?.();
      const activeKeyIndex = store.activeKeyIndex();

      if (!activePost || activePost.id !== post.id) {
        const nextKeyIndex = 1 % ALL_PROPERTIES.length;
        const nextPropertyKey = ALL_PROPERTIES[nextKeyIndex];
        patchState(store, {
          post,
          activeKeyIndex: nextKeyIndex,
          activeIndexValue: post[nextPropertyKey],
        });
        return;
      }
      const nextKeyIndex = (activeKeyIndex + 1) % ALL_PROPERTIES.length;
      const nextPropertyKey = ALL_PROPERTIES[nextKeyIndex];
      patchState(store, {
        activeKeyIndex: nextKeyIndex,
        activeIndexValue: post[nextPropertyKey],
      });
    },
  }))
);

import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Post } from '../models/post.model';
import { PostsApiService } from '../services/posts/posts-api.service';
import { catchError, tap, EMPTY } from 'rxjs';

type PostKey = keyof Post;
const ALL_PROPERTIES: PostKey[] = ['title', 'id', 'body', 'userId'];

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
  activeIndexValue?: Post[PostKey];
};

const initialActivePostState: ActivePostState = {
  post: undefined,
  activeKeyIndex: 0,
  activeIndexValue: undefined,
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialPostsState),
  withMethods((store, postsApiService = inject(PostsApiService)) => ({
    loadPosts() {
      patchState(store, { isLoading: true, error: null });

      postsApiService
        .getPosts()
        .pipe(
          tap((posts) => {
            patchState(store, { posts, isLoading: false, error: null });
          }),
          catchError((error) => {
            patchState(store, {
              posts: [],
              isLoading: false,
              error: error.message || 'Failed to load posts',
            });
            return EMPTY;
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

      const isNewPost = !activePost || activePost.id !== post.id;

      if (isNewPost) {
        const nextKeyIndex = 1 % ALL_PROPERTIES.length;
        const nextPropertyKey = ALL_PROPERTIES[nextKeyIndex];
        patchState(store, {
          post,
          activeKeyIndex: nextKeyIndex,
          activeIndexValue: post[nextPropertyKey],
        });
      }
      const nextKeyIndex = (activeKeyIndex + 1) % ALL_PROPERTIES.length;
      const nextPropertyKey = ALL_PROPERTIES[nextKeyIndex];
      patchState(store, {
        activeKeyIndex: nextKeyIndex,
        activeIndexValue: post[nextPropertyKey],
      });
    },

    resetActivePost(): void {
      patchState(store, initialActivePostState);
    },
  }))
);

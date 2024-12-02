// import { Injectable, signal } from '@angular/core';
// import { PostsApiService } from './posts-api.service';
// import { ActivePostState, Post } from '../../models/post.model';
// import { COVER_IMAGES } from '../../consts/constants';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class PostStateService {
//   posts = signal<Post[]>([]);
//   activePostState = signal<ActivePostState | null>({
//     post: {} as Post,
//     activeKeyIndex: 0,
//   });
//   loading = signal<boolean>(false);
//   allProperties: (keyof Post)[] = ['title', 'id', 'body', 'userId'];

//   constructor(private postsApiService: PostsApiService) {}
//   //   loadPosts(): void {
//   //     this.loading.set(true);
//   //     this.postsApiService.getPosts().subscribe({
//   //       next: (posts) => {
//   //         this.setPostsState(posts);
//   //       },
//   //       error: (error) => {
//   //         console.error('Error loading posts:', error);
//   //         this.loading.set(false);
//   //       },
//   //     });
//   //   }

//   setPostsState(posts: Post[]): void {
//     console.log('setPostsState', posts);

//     this.posts.set(posts);
//     // this.loading.set(false);
//   }

//   updateActivePost(postId: number): void {
//     const clickedPost = this.posts().find((post) => post.id === postId);
//     if (!clickedPost) return;

//     const currentState = this.activePostState();
//     const isSamePost = currentState?.post.id === postId;

//     const nextKeyIndex = isSamePost
//       ? (currentState.activeKeyIndex + 1) % this.allProperties.length
//       : 0;

//     this.activePostState.set({
//       post: clickedPost,
//       activeKeyIndex: nextKeyIndex,
//     });
//   }

//   getPropertyForPost(postId: number) {
//     // const currentState = this.activePostState();
//     // if (currentState?.post.id === post.id) {
//     //   return post[this.allProperties[currentState.activeKeyIndex]];
//     // }
//     // return post.title;
//   }

//   getRandomCoverImage(): string {
//     const randomIndex = Math.floor(Math.random() * COVER_IMAGES.length);
//     return COVER_IMAGES[randomIndex];
//   }
// }

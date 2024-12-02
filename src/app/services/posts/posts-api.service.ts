import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app-config/app-config';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private readonly postsUrl = AppConfig.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient.get<Post[]>(`${this.postsUrl}/posts`);
  }
}

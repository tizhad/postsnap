import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostContainerComponent } from './post-container.component';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from '../post-item/post-item.component';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PostsApiService } from '../../../services/posts/posts-api.service';
import { LoaderComponent } from '../../../loader/loader.component';
import { Post } from '../../../models/post.model';

describe('PostContainerComponent', () => {
  let component: PostContainerComponent;
  let fixture: ComponentFixture<PostContainerComponent>;
  let postsApiServiceMock: jasmine.SpyObj<PostsApiService>;

  beforeEach(async () => {
    postsApiServiceMock = jasmine.createSpyObj('PostsApiService', ['getPosts']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, LoaderComponent, PostItemComponent],
      providers: [
        { provide: PostsApiService, useValue: postsApiServiceMock },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    postsApiServiceMock.getPosts.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call loadPosts and populate posts on initialization', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Test Post', body: 'Body', userId: 1 },
      { id: 2, title: 'Another Post', body: 'Another Body', userId: 2 },
    ];

    postsApiServiceMock.getPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();
    expect(postsApiServiceMock.getPosts).toHaveBeenCalled();
    expect(component.posts()).toEqual(mockPosts);
    expect(component.loading()).toBeFalse();
  });

  it('should handle error when loading posts', () => {
    const error = { message: 'Error loading posts' };
    postsApiServiceMock.getPosts.and.returnValue(throwError(() => error));

    component.loadPosts();

    expect(postsApiServiceMock.getPosts).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('Error loading posts');
    expect(component.loading()).toBeFalse();
  });

  it('should update activePost when a post is clicked', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Test Post', body: 'Body', userId: 1 },
    ];
    component.posts.set(mockPosts);

    component.onPostClick(1);

    expect(component.activePost().post).toEqual(mockPosts[0]);
    expect(component.activePostId).toBe(1);
  });

  it('should return the correct property for the active post', () => {
    const mockPost: Post = { id: 1, title: 'Title', body: 'Body', userId: 1 };
    component.activePost.set({
      post: mockPost,
      activeKeyIndex: 2,
    });

    const property = component.getPropertyForPost(mockPost);

    expect(property).toEqual('Body');
  });
});

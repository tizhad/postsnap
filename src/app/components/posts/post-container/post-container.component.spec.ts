import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostContainerComponent } from './post-container.component';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from '../post-item/post-item.component';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PostsApiService } from '../../../services/posts/posts-api.service';
import { LoaderComponent } from '../../../loader/loader.component';
import { Post } from '../../../models/post.model';
import { ActivePostStore, PostsStore } from '../../../store/posts.store';

describe('PostContainerComponent', () => {
  let component: PostContainerComponent;
  let fixture: ComponentFixture<PostContainerComponent>;
  let postsApiServiceMock: jasmine.SpyObj<PostsApiService>;
  let activePostStoreMock: any;
  let postsStoreMock: any;

  beforeEach(async () => {
    postsApiServiceMock = jasmine.createSpyObj('PostsApiService', ['getPosts']);
    activePostStoreMock = {
      post: jasmine.createSpy('post'),
      activeIndexValue: jasmine.createSpy('activeIndexValue'),
    };
    postsStoreMock = {
      isLoading: jasmine.createSpy().and.returnValue(of(false)),
      posts: jasmine.createSpy().and.returnValue(of([])),
      loadPosts: jasmine.createSpy('loadPosts'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, LoaderComponent, PostItemComponent],
      providers: [
        { provide: PostsApiService, useValue: postsApiServiceMock },
        { provide: ActivePostStore, useValue: activePostStoreMock },
        { provide: PostsStore, useValue: postsStoreMock },
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

    postsStoreMock.loadPosts.and.callFake(() => {
      postsApiServiceMock.getPosts();
    });

    fixture.detectChanges();

    expect(postsStoreMock.loadPosts).toHaveBeenCalled();
    expect(postsApiServiceMock.getPosts).toHaveBeenCalled();
  });

  it('should return activeIndexValue when post is the active post', () => {
    const mockPost: Post = {
      id: 1,
      title: 'Test Post',
      body: 'Body',
      userId: 1,
    };

    activePostStoreMock.post.and.returnValue(mockPost);
    activePostStoreMock.activeIndexValue.and.returnValue('Active Value');

    const result = component.getPropertyForPost(mockPost);

    expect(activePostStoreMock.post).toHaveBeenCalled();
    expect(activePostStoreMock.activeIndexValue).toHaveBeenCalled();
    expect(result).toBe('Active Value');
  });

  it('should return the post title when post is not the active post', () => {
    const mockPost: Post = {
      id: 2,
      title: 'Another Post',
      body: 'Another Body',
      userId: 2,
    };

    activePostStoreMock.post.and.returnValue({ id: 1 });
    activePostStoreMock.activeIndexValue.and.returnValue(undefined);

    const result = component.getPropertyForPost(mockPost);

    expect(activePostStoreMock.post).toHaveBeenCalled();
    expect(result).toBe('Another Post');
  });

  it('should return the post title when there is no active post', () => {
    const mockPost: Post = {
      id: 3,
      title: 'No Active Post',
      body: 'Body',
      userId: 3,
    };

    activePostStoreMock.post.and.returnValue(undefined);

    const result = component.getPropertyForPost(mockPost);

    expect(activePostStoreMock.post).toHaveBeenCalled();
    expect(result).toBe('No Active Post');
  });
});

import { TestBed } from "@angular/core/testing";

import { PostsApiService } from "./posts-api.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("PostsApiService", () => {
  let service: PostsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostsApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

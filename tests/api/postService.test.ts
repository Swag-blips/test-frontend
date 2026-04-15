import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { postService } from "../../src/features/posts/services/postService";

const mockPosts = [
  { id: 1, userId: 1, title: "Test Post 1", body: "Body 1" },
  { id: 2, userId: 1, title: "Test Post 2", body: "Body 2" },
];

export const restHandlers = [
  http.get("https://jsonplaceholder.typicode.com/posts", () => {
    return HttpResponse.json(mockPosts);
  }),
  http.get("https://jsonplaceholder.typicode.com/posts/:id", ({ params }) => {
    const post = mockPosts.find((p) => p.id === Number(params.id));
    if (post) {
      return HttpResponse.json(post);
    }
    return new HttpResponse(null, { status: 404 });
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("postService", () => {
  it("fetches posts successfully", async () => {
    const posts = await postService.getPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Test Post 1");
  });

  it("fetches a single post successfully", async () => {
    const post = await postService.getPost(1);
    expect(post).toBeDefined();
    expect(post.title).toBe("Test Post 1");
  });
});
